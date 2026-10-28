const formModal = document.querySelector('#form-modal');
const formFrame = formModal.querySelector('iframe');
let returnFocus;
function openForm(button) {
  returnFocus = button;
  if (formFrame && !formFrame.src) {
    formFrame.addEventListener('load', () => { document.querySelector('.form-loading').hidden = true; }, {once:true});
    formFrame.src = formFrame.dataset.src;
    const embedScript = document.createElement('script');
    embedScript.src = 'https://link.msgsndr.com/js/form_embed.js';
    embedScript.async = true;
    document.body.appendChild(embedScript);
  }
  formModal.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-open-form]').forEach(button => button.addEventListener('click', () => openForm(button)));
document.querySelector('[data-close-modal]').addEventListener('click', () => formModal.close());
formModal.addEventListener('click', event => {
  const rect = formModal.getBoundingClientRect();
  if (event.target === formModal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) formModal.close();
});
formModal.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus({preventScroll:true}); });
const legalModal = document.querySelector('#legal-modal');
const legal = {
  terms: ['First-visit terms', '<p>The $395 first visit takes place in person at Ascend Regenerative in Denville, NJ. It includes an evaluation with Dr. Mian, ultrasound if clinically indicated, and one shockwave or ML7 laser treatment.</p><p>The visit fee is non-refundable. If you proceed with regenerative treatment, the $395 is applied to that treatment plan. The visit and regenerative treatment are self-pay. Additional imaging and other treatment are not included in the first-visit price.</p><p>Submitting the form requests a call from the office. It does not book an appointment, establish medical candidacy or guarantee a result. The office confirms availability, treatment suitability and pricing.</p>'],
  accessibility: ['Accessibility', '<p>If you have difficulty using this page or completing the form, our Denville office can help during office hours, Monday to Friday, 9 a.m. to 5 p.m.</p><p>You can use the keyboard to open the form, expand questions and navigate this page. Press Escape to close this window or the form popup.</p>']
};
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const content = legal[button.dataset.legal];
  document.querySelector('#legal-title').textContent=content[0];
  document.querySelector('#legal-content').innerHTML=content[1];
  legalModal.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('[data-close-legal]').addEventListener('click', () => legalModal.close());
legalModal.addEventListener('close', () => document.body.classList.remove('modal-open'));
const variants = {
  knee:{headline:'Relief from knee pain, without a knee replacement.',final:'Find out if you can skip the knee replacement.',bullets:["You plan your day around whether the knee will hold up.","In a new building, you look for the elevator first.","You quit golf, pickleball or the morning walk, and you miss it.","Cortisone shots help for less time every round.","You were told you're ‘not bad enough yet’ for a replacement, but you're tired of living like this.","You take Advil or Aleve most days just to get through work."],outcomes:['Take the stairs without reaching for the rail.','Get through a full workday on your feet.','Get down on the floor with the grandkids, and back up.','Sleep through the night.']},
  hip:{headline:'Relief from hip pain, without a hip replacement.',final:'Find out if you can skip the hip replacement.',bullets:['Getting in and out of the car takes a plan.','You sleep on one side because the other one hurts.','Putting on socks and shoes is harder than it should be.','Cortisone shots help for less time every round.',"You were told you're ‘not bad enough yet’ for a replacement, but you're tired of living like this.",'You stopped taking the walks and trips you used to plan your year around.'],outcomes:['Get in and out of the car without bracing yourself.','Walk the whole course, then go out to dinner.','Sleep on either side.',"Take the trip you've been putting off."]},
  back:{headline:'Relief from back pain, without spine surgery.',final:'Find out if you can skip spine surgery.',bullets:["You can't stand at the sink or the grill for long before you need to sit.",'Picking up a grandchild feels like a gamble.','Long car rides leave you stiff for the rest of the day.','Epidurals and nerve blocks help for less time every round.','A surgeon brought up fusion, and you want to know what else is out there first.','You take something for the pain most days just to get through work.'],outcomes:['Stand at the grill for the whole cookout.','Pick up a grandchild without thinking twice.','Drive an hour and step out of the car walking normally.','Get through a workday without reaching for pain pills.']},
  shoulder:{headline:'Relief from shoulder pain, without shoulder surgery.',final:'Find out if you can skip shoulder surgery.',bullets:['Reaching for the top shelf or the seatbelt makes you wince.',"You can't sleep on that side anymore.",'You quit golf, tennis or swimming because of the shoulder.','Cortisone shots help for less time every round.','A surgeon mentioned an operation and months of rehab, and you want to know what else is out there first.',"Getting dressed hurts more than it should."],outcomes:['Reach the top shelf without a second thought.','Swing a golf club or a tennis racket again.','Sleep on that side.','Lift a carry-on into the overhead bin.']}
};
const segment = new URLSearchParams(location.search).get('seg');
if (Object.hasOwn(variants, segment)) {
  const variant=variants[segment];
  const title=document.querySelector('#hero-title'); title.textContent=variant.headline;
  document.querySelector('#final-title').textContent=variant.final;
  document.title=`${segment[0].toUpperCase()+segment.slice(1)} Pain Treatment Without Surgery | Ascend Regenerative`;
  document.querySelector('#problem-list').replaceChildren(...variant.bullets.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
  document.querySelector('#outcomes').replaceChildren(...variant.outcomes.map(text=>{const p=document.createElement('p');const icon=document.createElement('span');icon.textContent='↗';icon.setAttribute('aria-hidden','true');p.append(icon,document.createTextNode(text));return p}));
  const hero=document.querySelector('#hero-image');hero.src=`assets/${segment}-pain.webp`;hero.alt=`Illustrative scene of an adult experiencing ${segment} pain`;
  const anatomy=document.querySelector('#anatomy-image');anatomy.src=`assets/${segment}-anatomy.webp`;anatomy.alt=`Illustrative ${segment} anatomy with the painful region highlighted in red`;
}
