const formModal = document.querySelector('#form-modal');
const formFrame = formModal.querySelector('iframe');
let returnFocus;
function openForm(button) {
  returnFocus = button;
  if (formFrame && !formFrame.src) {
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

// ?seg=knee|hip|back|shoulder: the body-part versions from the copy doc
const variants = {
  knee:{headline:['Relief from knee pain,','without a knee replacement.'],final:'Find out if you can skip the knee replacement.',bullets:['You plan your day around whether the knee will hold up.','In a new building, you look for the elevator first.','You quit golf, pickleball or the morning walk, and you miss it.','Cortisone shots help for less time every round.',"You were told you're “not bad enough yet” for a replacement, but you're tired of living like this.",'You take Advil or Aleve most days just to get through work.'],outcomes:['Take the stairs without reaching for the rail.','Get through a full workday on your feet.','Get down on the floor with the grandkids, and back up.','Sleep through the night.']},
  hip:{headline:['Relief from hip pain,','without a hip replacement.'],final:'Find out if you can skip the hip replacement.',bullets:['Getting in and out of the car takes a plan.','You sleep on one side because the other one hurts.','Putting on socks and shoes is harder than it should be.','Cortisone shots help for less time every round.',"You were told you're “not bad enough yet” for a replacement, but you're tired of living like this.",'You stopped taking the walks and trips you used to plan your year around.'],outcomes:['Get in and out of the car without bracing yourself.','Walk the whole course, then go out to dinner.','Sleep on either side.',"Take the trip you've been putting off."]},
  back:{headline:['Relief from back pain,','without spine surgery.'],final:'Find out if you can skip spine surgery.',bullets:["You can't stand at the sink or the grill for long before you need to sit.",'Picking up a grandchild feels like a gamble.','Long car rides leave you stiff for the rest of the day.','Epidurals and nerve blocks help for less time every round.','A surgeon brought up fusion, and you want to know what else is out there first.','You take something for the pain most days just to get through work.'],outcomes:['Stand at the grill for the whole cookout.','Pick up a grandchild without thinking twice.','Drive an hour and step out of the car walking normally.','Get through a workday without reaching for pain pills.']},
  shoulder:{headline:['Relief from shoulder pain,','without shoulder surgery.'],final:'Find out if you can skip shoulder surgery.',bullets:['Reaching for the top shelf or the seatbelt makes you wince.',"You can't sleep on that side anymore.",'You quit golf, tennis or swimming because of the shoulder.','Cortisone shots help for less time every round.','A surgeon mentioned an operation and months of rehab, and you want to know what else is out there first.','Getting dressed hurts more than it should.'],outcomes:['Reach the top shelf without a second thought.','Swing a golf club or a tennis racket again.','Sleep on that side.','Lift a carry-on into the overhead bin.']}
};
const segment = new URLSearchParams(location.search).get('seg');
if (Object.hasOwn(variants, segment)) {
  const variant = variants[segment];
  const listItems = lines => lines.map(text => { const li = document.createElement('li'); li.textContent = text; return li; });
  const rest = document.createElement('span'); rest.textContent = variant.headline[1];
  document.querySelector('#hero-title').replaceChildren(variant.headline[0] + ' ', rest);
  document.title = `${segment[0].toUpperCase() + segment.slice(1)} Pain Treatment Without Surgery | Ascend Regenerative, Denville NJ`;
  document.querySelector('#tissue').textContent = `the damaged tissue in your ${segment}`;
  document.querySelector('#problem-list').replaceChildren(...listItems(variant.bullets));
  document.querySelector('#outcomes').replaceChildren(...listItems(variant.outcomes));
  document.querySelector('#final-title').textContent = variant.final;
}
