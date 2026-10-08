// 護靈壯士 · Hộ Linh Tráng Sĩ — overlay of src/ui/loading.js (same exports modeLabel, createLoading): Vietnamese band,
// stage labels and tips (Kinh nghiệm), with officer tips for this game's kits (Đinh Liễn's bow, Khuông Việt's sigil,
// Phạm Bạch Hổ's roar, Lê Hoàn's rally, Nguyễn Bặc's crescent waves, Đỗ Cảnh Thạc's armour). The engine's header follows.
// Loading card (#loading, ui lane). 出陣 on the select screen ink-wipes into this card (so does 再戰 on the result), then
// main.js deploy() sets the battle up for the chosen officer under it — kit views built, every material compiled, a few
// frames rendered — and ink-wipes on into the prologue (story) or the battle (free / retry). So the field is never seen
// with the wrong officer and the first battle frames don't stall on shader compiles.
// Layout (DW loading card): the officer's key art full-bleed (ctx.art: the select stage's key-art still, main.js snapArt)
// with a slow push-in and rising embers, an ink band on the left with the chapter band, brush name + red seal, the intro
// line; a tip (心得) and a gold brush-stroke progress bar with the current set-up stage along the bottom. No art (dev
// entry): the plain background.
// ctx in: { mode ('story' | 'trial' | 'free'), ch, char, art? }. main.js drives progress(p, zh?, en?) and ready(); nothing here touches the sim.
import { CHARS, DEFAULT_CHAR } from '../../../src/chars/index.js';
import { replay } from '../../../src/ui/menu.js';
import { same } from '../../../src/ui/title.js';
import { difficulty } from '../../../src/core/difficulty.js';
import { chapter } from '../../../src/story/chapters.js';

/** [zh, en] band label for a flow ctx: the chapter (story), the trial, or the battlefield (free: the chapter ctx.ch's
 *  field). */
export function modeLabel(c) {
  const { CH } = chapter(c.ch);
  return c.mode === 'free' ? [`Tự do chiến · ${CH.title.zh}`, `Free battle · ${CH.title.en}`]
    : [`${CH.num.zh} · ${CH.title.zh}`, `${c.mode === 'story' ? 'Story' : 'Trial'} · ${CH.title.en}`];
}
// [zh, en, char id | undefined = any officer] — keep in step with the controls table (title.js CONTROLS)
const TIPS = [
  ['Bấm J liên tiếp để ra trọn chuỗi đòn; giữa chuỗi bấm K để tung đòn tụ lực.', 'Tap J for the full combo; press K mid-combo for a charge attack.'],
  ['Khi thanh vàng đầy, bấm I để tung Vô Song.', 'When the gold gauge is full, press I to unleash your Musou.'],
  ['Bấm L hoặc Shift để né: trong lúc lăn mình, đao thương không chạm tới.', 'L or Shift dodges; the roll slips through a blow.'],
  ['Bấm R để đưa góc nhìn về sau lưng, hoặc nhắm tướng địch gần nhất.', 'R recenters the camera behind you, or onto the nearest officer.'],
  ['Bấm vào chiến trường để xoay góc nhìn bằng chuột; Q / E cũng xoay được.', 'Click the field to steer the camera with the mouse; Q / E turn it too.'],
  ['Tướng địch ngã xuống thường để lại lương thực hồi sức.', 'Fallen officers often leave rations that restore your strength.'],
  ['Giữ K (hoặc chuột phải) để giương cung ngắm, đứng hay chạy đều được; thả ra là bắn, kéo căng hết cỡ thì tên xuyên cả hàng.',
    'Hold K / right click to draw and aim (standing or running); release to loose. A full draw pierces a line.', 'nguyenphong'],
  ['Nhắm vào đầu tướng địch: trúng đầu, sát thương tăng bội.', 'Aim for an officer\'s head: a headshot hits far harder.', 'nguyenphong'],
  ['Thương của An Nhiên dài và nhanh: áp sát liên tục, đừng để quân địch kịp khép vòng vây.',
    'An Nhiên\'s spear is long and fast: keep pressing before they can close the ring.', 'annhien'],
  ['Trường đao chém ra sóng trăng khuyết bay xa: dùng đòn tụ lực để quét cả hàng quân.',
    'The long saber throws crescent waves: charge attacks clear whole ranks.', 'huutuong'],
  ['Năm đòn J rồi K: Đinh Khang giơ đao sông, sóng chấn lan ra, quân ta quanh mình hồi sức và hăng hái trở lại.',
    'J ×5 then K: Đinh Khang raises his blades; a shock ring rolls out and rallies your side nearby.', 'dinhkhang'],
  ['Năm đòn J rồi K: Tả Tướng cắm giáo gầm vang, sóng chấn hất văng cả vòng quân địch.',
    'J ×5 then K: the Left General plants his spear and roars; the shockwave hurls back every foe around him.', 'tatuong'],
  ['Năm đòn J rồi K: Thầy Mo rung chuông vạch vòng chỉ son trên đất, quân địch đứng trong vòng đều trúng phép.',
    'J ×5 then K: the shaman rings his bells and draws a cinnabar ring on the ground; every foe inside it is struck.', 'thaymo'],
  ['Mỗi nhịp gậy chuông tung ra một luồng gió chém xa: đứng ngoài tầm giáo mà đánh.',
    'Each sweep of the bell staff throws a wind blade: fight from beyond the spears\' reach.', 'thaymo'],
  ['Những nhát kích đầu chuỗi không thể bị ngắt: cứ xông thẳng vào giữa trận.',
    'The halberd\'s opening strokes cannot be interrupted: wade straight into the press.', 'hangtuong'],
  ['Bông lau là chính danh, cò trắng là ký ức, chỉ son là đường nghi binh, chuông đồng là ranh giới sống chết.',
    'Reed plumes for the rightful cause, white storks for memory, the cinnabar thread for the false roads, the bronze bell for the line between life and death.'],
];

export function createLoading(el) {
  el.innerHTML = `
    <div class="l-art"></div><div class="l-embers"></div><div class="l-veil"></div>
    <section class="l-main">
      <p class="l-ch"><b></b><small></small></p>
      <div class="l-name"><h1></h1><i class="l-seal"></i></div>
      <p class="l-en"></p>
      <p class="l-line"><b></b><small></small></p>
    </section>
    <footer class="l-foot">
      <p class="l-tip"><span>心得</span><em>Kinh nghiệm</em><b></b><small></small></p>
      <div class="l-prog"><p class="l-state"><b></b><small></small></p><div class="l-bar"><i></i></div></div>
    </footer>`;
  const $ = (s) => el.querySelector(s), bar = $('.l-bar i');
  const state = (zh, en) => { $('.l-state b').textContent = zh; $('.l-state small').textContent = en; };
  return {
    enter(c) {
      const ch = CHARS[c.char] || CHARS[DEFAULT_CHAR], [zh, en] = modeLabel(c);
      el.style.setProperty('--acc', ch.accent);
      $('.l-art').style.backgroundImage = c.art ? `url("${c.art}")` : 'none';
      el.classList.remove('ready'); replay(el, 'in');
      const d = difficulty();
      $('.l-ch b').textContent = `${zh} · ${d.zh}`; $('.l-ch small').textContent = `${en} · ${d.en}`;
      $('.l-name h1').textContent = ch.name.zh; $('.l-name h1').style.setProperty('--n', [...ch.name.zh].length); $('.l-seal').textContent = ch.seal;
      $('.l-en').innerHTML = `<b>${ch.courtesy?.zh || ''}</b>${same(ch.name.zh, ch.name.en) ? '' : `${ch.name.en} · `}${ch.title.zh}<small>${ch.title.en}</small>`;
      $('.l-line b').textContent = ch.lines.intro.zh; $('.l-line small').textContent = ch.lines.intro.en;
      const tips = TIPS.filter((t) => !t[2] || t[2] === ch.id), t = tips[Math.floor(Math.random() * tips.length)];   // UI only, not the sim
      $('.l-tip b').textContent = t[0]; $('.l-tip small').textContent = t[1];
      state('Chuẩn bị xuất quân', 'Marshalling the army');           // first stage label; deploy() then climbs 點將 → 佈陣 → 整軍備戰
      this.progress(0.06);
    },
    exit() {},
    /** p 0..1 plus the stage's label: real set-up stages (main.js deploy). */
    progress(p, zh, en) { bar.style.transform = `scaleX(${p})`; if (zh) state(zh, en); },
    ready() { el.classList.add('ready'); state('Xuất trận!', 'To battle'); },
  };
}
