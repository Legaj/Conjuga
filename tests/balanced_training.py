from visual_smoke_v41 import ROOT,bundle
from playwright.sync_api import sync_playwright
import re

def run():
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  page=browser.new_page(viewport={'width':1360,'height':900}); errors=[]
  page.on('pageerror', lambda e:errors.append(str(e)))
  css=re.sub(r'^@import[^\n]*\n','',(ROOT/'style.css').read_text(), count=1)
  page.set_content(f'<html><head><style>{css}</style></head><body><div id="app"></div></body></html>')
  page.add_script_tag(content=bundle())
  page.locator('[data-action=choose-study][data-value=verbs]').click()
  page.locator('#verbGroup').select_option('regular')
  page.locator('#verbMode').select_option('coverage')
  page.locator('#verbRounds').select_option('3')
  assert '54 frågor' in page.locator('.training-summary').inner_text(),page.locator('.training-summary').inner_text()
  page.locator('[data-action=start]').click()
  assert page.locator('.progress-num').inner_text()=='1 / 54'
  counts=page.evaluate('''() => {const m={};for(const c of state.session.cards){let k=c.family+':'+c.person;m[k]=(m[k]||0)+1}return m}''')
  assert len(counts)==18 and set(counts.values())=={3},counts
  assert page.locator('.base-verb').count()==1
  assert page.locator('.meaning-under-verb').inner_text().strip()
  assert page.locator('.grammar-tile').count()==3
  page.locator('#answer-field').fill('wrong answer')
  page.locator('#answer-form').press('Enter')
  assert page.locator('.progress-num').inner_text()=='1 / 54'
  page.keyboard.press('Enter')
  assert page.locator('.progress-num').inner_text()=='1 / 54'
  assert page.locator('.answer-feedback.incorrect').count()==1
  page.wait_for_timeout(1950); page.keyboard.press('Enter')
  assert page.locator('.progress-num').inner_text()=='2 / 54' # no ad-hoc retry appended
  page.locator('[data-action=stop]').click()
  page.locator('[data-action=go][data-value=train]').last.click()
  page.locator('#verbTense').select_option('preterito')
  assert '36 frågor' in page.locator('.training-summary').inner_text()
  page.locator('#verbTense').select_option('futuro')
  assert '18 frågor' in page.locator('.training-summary').inner_text()
  page.locator('#verbTense').select_option('presente')
  page.locator('#verbMode').select_option('smart')
  page.locator('#count').select_option('30')
  page.locator('[data-action=start]').click()
  counts=page.evaluate('''() => {const m={};for(const c of state.session.cards)m[c.ending]=(m[c.ending]||0)+1;return m}''')
  assert counts=={'ar':10,'er':10,'ir':10},counts
  page.screenshot(path=str(ROOT.parent/'conjuga-balanced-training.png'))
  assert not errors,errors
  print('PASS balanced: 54-coverage once per family/person per round, no automatic advancement, Swedish translation visible, past shared endings, future shared endings, balanced 30, browser errors:',errors)
  browser.close()
if __name__=='__main__':run()
