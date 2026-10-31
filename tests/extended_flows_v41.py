from visual_smoke import ROOT,bundle
import re
from playwright.sync_api import sync_playwright

def start_page(browser,width=1360,height=900):
  page=browser.new_page(viewport={'width':width,'height':height})
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  css=re.sub(r'^@import[^\n]*\n','',(ROOT/'style.css').read_text(),count=1)
  page.set_content(f'<html><head><style>{css}</style></head><body><div id="app"></div></body></html>')
  page.add_script_tag(content=bundle())
  return page,errors

def run():
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  page,errors=start_page(browser)
  page.locator('[data-action="choose-study"][data-value="verbs"]').click()
  page.locator('#verbTense').select_option('preterito')
  page.locator('#verbPerson').select_option('0')
  page.locator('#verbGroup').select_option('regular')
  page.locator('#count').select_option('10')
  page.locator('[data-action=start]').click()
  assert 'Pretérito' in page.locator('.grammar-focus').inner_text()
  assert page.locator('#answer-field').count()==1
  prompt=page.locator('.question-type').inner_text()
  page.locator('#answer-field').fill('wrong spelling')
  page.locator('#answer-form').press('Enter')
  assert page.locator('.answer-feedback.incorrect').count()==1
  assert page.locator('.progress-num').inner_text().startswith('1 /') # no auto advancement
  page.keyboard.press('Enter')
  assert page.locator('.progress-num').inner_text().startswith('1 /')
  page.wait_for_timeout(1950)
  page.keyboard.press('Enter')
  assert page.locator('.progress-num').inner_text().startswith('2 /')
  page.locator('[data-action=stop]').click()
  assert page.locator('.result').count()==1
  page.locator('.result-actions [data-action=go][data-value=train]').click()
  page.locator('[data-action=study][data-value=words]').click()
  page.locator('#mode').select_option('listen')
  page.locator('[data-action=start]').click()
  assert page.locator('.audio-main').count()==1
  assert page.locator('#answer-field').count()==1
  page.locator('[data-action=stop]').click()
  page.locator('[data-action=go][data-value=home]').last.click()
  page.locator('[data-action=language][data-value=sv]').click()
  page.locator('[data-action=choose-study][data-value=words]').click()
  page.locator('#mode').select_option('exam')
  page.locator('#level').select_option('exam')
  page.locator('[data-action=start]').click()
  assert page.locator('.answer-option').count()==5
  assert page.locator('#time-left').count()==1
  assert page.locator('.progress-num').inner_text()=='1 / 10'
  page.locator('.answer-option').first.click()
  assert page.locator('.answer-feedback').count()==1
  page.locator('[data-action=stop]').click()
  page.locator('[data-action=go][data-value=home]').last.click()
  page.locator('[data-action=profile-toggle]').click()
  assert page.locator('.profile-pop').count()==1
  page.locator('[data-action=profile-page]').last.click()
  assert 'Statistik & profil' in page.locator('h1').inner_text()
  assert page.locator('.metric').count()>=4
  page.locator('#images').uncheck()
  page.locator('#strict').uncheck()
  assert page.evaluate('data.settings.images===false && data.settings.strict===false')
  page.locator('[data-action=export]').click()
  assert page.locator('#import-file').count()==1
  page.locator('[data-action=go][data-value=library]').first.click()
  page.locator('#librarySort').select_option('exam')
  assert page.locator('.library-meta').inner_text().startswith('40')
  assert page.locator('.vocab-tile').count()==36
  page.set_viewport_size({'width':390,'height':850})
  page.locator('[data-action=go][data-value=learn]').first.click()
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'),page.evaluate('document.documentElement.scrollWidth')
  print('PASS extended: verb mode, typing correction, enter next, listening, timed 10-item exam, real ORD filter, profile, settings, download, responsive overflow. Errors:',errors)
  assert not errors,errors
  browser.close()
if __name__=='__main__':run()
