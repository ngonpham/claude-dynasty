#!/usr/bin/env python3
"""Rebuild holinh/fonts/han-brush.woff2: Yuji Boku (SIL OFL 1.1, Kinuta Font Factory) subset to every Hán glyph
護靈壯士 shows (seals, Musou copy, army glyphs, prologue columns, banners, the logo), plus brush digits.

    python3 holinh/fonts/subset.py            # grep holinh/ for Hán, fetch the subset from Google Fonts, write the woff2
    python3 holinh/fonts/subset.py --list     # only print the glyph set

Run it again whenever new Hán text lands in holinh/ (a glyph missing here falls back to the engine's HudBrush, then to
the system CJK font: never tofu, but off-style). EXTRA keeps likely glyphs for chapter prologues / seals in the set even
before they are written. Needs network access to fonts.googleapis.com / fonts.gstatic.com."""
import os, re, sys, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)
HAN = re.compile('[　-〿㐀-䶿一-鿿豈-﫿＀-￯]')
# likely in seals / prologue columns of the campaign (944-968): places, titles, years, the classical verbs of war
EXTRA = ('十二使君天下分裂華閭交州大瞿越丁先皇帝萬勝王吳昌文岌晉南天策阮匐黎桓璉范白虎匡越真流杜景碩矯公罕超'
         '西扶烈峰州藤布海口陳覽洞江長安都城寨柵圍攻守戰敗走降死立功名大丈夫子孫兄弟父母臣民國家山河社稷統一'
         '平定討伐征破斬殺擒獲射箭弓刀劍槍戟旗蘆鼓鐘火燒夜月日年春夏秋冬東南北中原雲龍虎鳳仙佛法僧寺塔水船渡橋'
         '人心義信忠勇智謀仁德威武雄英豪傑軍兵將帥卒馬車騎步陣營門關城牆壘烽煙血淚生歸還來去出入上下左右前後'
         '一二三四五六七八九十百千萬億壹貳參肆伍陸柒捌玖拾第章序終幕')
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'


def glyphs():
    s = set(EXTRA) | set('0123456789·')
    for root, dirs, files in os.walk(GAME):
        dirs[:] = [d for d in dirs if d not in ('fonts', 'checks', 'tools')]
        for f in files:
            if f.endswith(('.js', '.html')):
                text = open(os.path.join(root, f), encoding='utf8').read()
                s |= set(HAN.findall(re.sub(r'//[^\n]*|/\*.*?\*/', '', text, flags=re.S)))
    return ''.join(sorted(s))


def main():
    text = glyphs()
    if '--list' in sys.argv:
        return print(len(text), text)
    url = 'https://fonts.googleapis.com/css2?family=Yuji+Boku&text=' + urllib.parse.quote(text)
    css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA})).read().decode()
    woff = re.search(r'url\((https://[^)]+)\)', css).group(1)
    data = urllib.request.urlopen(urllib.request.Request(woff, headers={'User-Agent': UA})).read()
    open(os.path.join(HERE, 'han-brush.woff2'), 'wb').write(data)
    print(f'han-brush.woff2: {len(text)} glyphs, {len(data)} bytes')


if __name__ == '__main__':
    main()
