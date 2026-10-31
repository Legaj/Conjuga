from pathlib import Path
import re
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
def bundle():
    sources=[]
    for p in ['data/words.js','data/courses.js','src/verbs.js','src/review.js','src/cloud.js','app.js']:
        s=(ROOT/p).read_text()
        s=re.sub(r'^import .+;\s*$', '',s,flags=re.M)
        s=re.sub(r'^export (const|function|async function|class)\b',r'\1',s,flags=re.M)
        s=re.sub(r'^export default ', 'const words = ',s,flags=re.M)
        s=re.sub(r'^export \{[^\n]+\};?\s*$', '',s,flags=re.M)
        sources.append(s)
    return '\n'.join(sources)

def run():
  with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':950},device_scale_factor=1)
    errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
    css=re.sub(r'^@import[^\n]*\n', '',(ROOT/'style.css').read_text(),count=1)
    page.set_content(f'<html lang="sv"><head><meta charset="utf-8"><style>{css}</style></head><body><div id="app"></div></body></html>')
    page.add_script_tag(content=bundle())
    print('PAGE',page.locator('h1').all_text_contents(),'errors',errors)
    assert page.locator('h1').first.inner_text()=='Spanska'
    page.screenshot(path=str(ROOT.parent/'conjuga-v4-desktop.png'),full_page=True)
    page.locator('[data-action="choose-study"][data-value="words"]').click()
    assert page.locator('h1').inner_text()=='Träna'
    page.locator('[data-action="start"]').click()
    assert page.locator('.answer-option').count()==5
    page.screenshot(path=str(ROOT.parent/'conjuga-v4-training.png'),full_page=True)
    page.locator('.answer-option').first.click()
    assert page.locator('.answer-feedback').count()==1
    page.wait_for_timeout(2000)
    page.locator('[data-action="next"]').click()
    page.locator('[data-action="stop"]').click()
    assert 'Passet avslutat' in page.locator('h1').inner_text()
    page.locator('[data-action="go"][data-value="home"]').last.click()
    page.locator('[data-action="language"][data-value="sv"]').click()
    assert 'Svenska ord' in page.locator('h1').inner_text()
    page.locator('[data-action="go"][data-value="library"]').first.click()
    assert page.locator('.vocab-tile').count()==36
    page.locator('[data-action="save-word"]').first.click()
    page.locator('#library-search').fill('abrogation')
    assert page.locator('.vocab-tile').count()==1
    page.locator('[data-action="go"][data-value="learn"]').first.click()
    assert page.locator('.lesson-content').count()==1
    page.locator('[data-action="learn-tab"][data-value="roots"]').click()
    assert page.locator('.root-card').count()>=60
    page.screenshot(path=str(ROOT.parent/'conjuga-v4-learn.png'),full_page=True)
    page.set_viewport_size({'width':390,'height':844})
    page.locator('[data-action="go"][data-value="home"]').first.click()
    page.screenshot(path=str(ROOT.parent/'conjuga-v4-mobile.png'),full_page=True)
    print('PASS: desktop, question, answer, next/quit, Swedish, library, bookmarking, search, lessons, roots, mobile layout; errors',errors)
    assert errors==[],errors
    browser.close()
if __name__=='__main__':run()
