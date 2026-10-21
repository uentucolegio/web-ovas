'use strict';
const $=id=>document.getElementById(id);
const solved=new Set();
function award(id){solved.add(id);$('content-score').textContent=solved.size*10;$('content-progress').value=solved.size;$('content-badge').textContent=solved.size===6?'🏅 Laboratorio completado':'Completa 5 retos y la misión del simulador.';}
function navigate(id){if(!document.getElementById(id)?.classList.contains('content-pane'))id='introduccion';document.querySelectorAll('.content-pane').forEach(x=>x.classList.toggle('active',x.id===id));document.querySelectorAll('.sidebar-link').forEach(a=>{a.classList.toggle('active',a.dataset.target===id);if(a.dataset.target===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});$('mobile-nav').value=id;}
document.querySelectorAll('.sidebar-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();navigate(a.dataset.target);}));$('mobile-nav').addEventListener('change',e=>navigate(e.target.value));
document.querySelectorAll('.accordion-btn').forEach(b=>b.addEventListener('click',()=>{const p=document.querySelector(b.dataset.target);p.classList.toggle('hidden');b.setAttribute('aria-expanded',String(!p.classList.contains('hidden')));}));
document.querySelectorAll('[data-check]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.check),v=document.querySelector(`input[name="checkpoint-${n}"]:checked`),q=lesson.panels[n],out=$('feedback-'+n);if(!v){out.textContent='Selecciona una respuesta antes de comprobar.';return;}const ok=Number(v.value)===q.correct;out.textContent=(ok?'¡Correcto! ⭐ ':'Revisa la decisión. 💡 ')+q.explanation;if(ok)award('checkpoint-'+n);}));
const seen=new Set();let cupos=null;
function sim(){const out=$('sim-output');try{
 if(lesson.kind==='solid'){
  const raw=$('sim-value').value;if(!/^[+-]?\d+$/.test(raw.trim()))throw Error('Usa un entero en centavos.');const n=Number(raw);if(n<0||n>2147483647)throw Error('Entrada inválida: subtotal entre 0 e Integer.MAX_VALUE.');
  const p=$('sim-option').value;const value=p==='none'?n:p==='ten'?n-Math.trunc(n/10):p==='fixed'?Math.max(0,n-500):-1;
  if(value<0||value>n){out.textContent='IllegalStateException: contrato incumplido. El consumidor rechaza la política defectuosa.';seen.add('bad');}else{out.textContent=`Total: ${value} centavos. Contrato de rango respetado. Política: ${$('sim-option').selectedOptions[0].textContent}.`;if(p==='fixed'&&[0,300,10000].includes(n))seen.add(String(n));}
  if(['0','300','10000','bad'].every(x=>seen.has(x)))award('sim');
 }else if(lesson.kind==='errors'){
  const raw=$('sim-value').value,isNull=$('sim-null').checked;let stage,result;
  if(isNull||!raw.replace(/^[\x00-\x20]+|[\x00-\x20]+$/g,'').length){stage='Presencia';result='Edad requerida';}
  else{const v=raw.replace(/^[\x00-\x20]+|[\x00-\x20]+$/g,'');if(!/^[+-]?[0-9]+$/.test(v)||!Number.isSafeInteger(Number(v))||Number(v)<-2147483648||Number(v)>2147483647){stage='Conversión';result='Entero representable requerido';}else if(Number(v)<0||Number(v)>120){stage='Rango';result='Edad fuera de 0..120';}else{stage='Aceptada';result='OK '+Number(v);}}
  seen.add(stage);out.textContent=`${stage}: ${result}. ${stage==='Aceptada'?'Dato validado; no se almacena un registro.':'Sin modificación del estado.'}`;if(seen.size===4)award('sim');
 }else if(lesson.kind==='tests'){
  const mutation=$('sim-option').value;let failures=0;const cases=[[-1,null],[0,0],[1,2500],[3,7500],[9,22500],[10,25000],[11,null]];let lines=[];
  for(const [n,expected]of cases){let actual=(n<0||(mutation==='boundary'?n>=10:n>10))?null:n*(mutation==='price'?2400:2500);const ok=actual===expected;if(!ok)failures++;lines.push(`${ok?'✓':'✗'} cantidad ${n} | esperado ${expected===null?'rechazo':expected} | observado ${actual===null?'rechazo':actual}`);}
  out.textContent=lines.join('\n')+`\n${cases.length-failures}/7 casos correctos en esta simulación.`;seen.add(mutation);if(['ok','boundary','price'].every(x=>seen.has(x)))award('sim');
 }else{
  if(cupos===null)throw Error('Inicializa el control antes de reservar.');if(cupos===0){out.textContent='IllegalStateException: Sin cupos. Estado posterior: 0. Se conserva el estado.';seen.add('rejected');}else{cupos--;out.textContent='Reserva válida. Retorno y cupos restantes: '+cupos;seen.add('reserved');}if(seen.has('reserved')&&seen.has('rejected'))award('sim');
 }
 $('sim-status').textContent='Escenarios explorados: '+seen.size;
 }catch(e){out.textContent=e.message;}}
$('sim-run').addEventListener('click',sim);
$('sim-init')?.addEventListener('click',()=>{const raw=$('sim-value').value,n=Number(raw);if(!/^\d+$/.test(raw)||n>2147483647){$('sim-output').textContent='IllegalArgumentException: capacidad entera no negativa requerida. El control previo no cambia.';return;}cupos=n;$('sim-output').textContent='Control inicializado con '+n+' cupos.';});
function renderQuiz(){const holder=$('quiz');holder.innerHTML='';quizData.forEach((q,i)=>{const f=document.createElement('fieldset');f.className='bg-white rounded-lg p-5 border border-slate-200 mb-4';const l=document.createElement('legend');l.className='font-bold text-green-800';l.textContent=(i+1)+'. '+q.question;f.append(l);q.options.forEach((opt,j)=>{const label=document.createElement('label');label.className='flex gap-3 items-start p-3 rounded border border-slate-200 my-2 cursor-pointer';const input=document.createElement('input');input.type='radio';input.name='q'+i;input.value=j;input.required=true;label.append(input,document.createTextNode(opt));f.append(label);});const feedback=document.createElement('p');feedback.id='quiz-feedback-'+i;feedback.setAttribute('aria-live','polite');f.append(feedback);holder.append(f);});}
renderQuiz();$('grade').addEventListener('click',()=>{let score=0,answered=0;quizData.forEach((q,i)=>{const a=document.querySelector(`input[name=q${i}]:checked`);if(a)answered++;});if(answered<quizData.length){$('quiz-result').textContent=`Has respondido ${answered}/${quizData.length}. Completa las preguntas para calificar.`;return;}quizData.forEach((q,i)=>{const a=document.querySelector(`input[name=q${i}]:checked`);const ok=Number(a.value)===q.correct;if(ok)score++;$('quiz-feedback-'+i).textContent=(ok?'✓ Correcto. ':'✗ Revisa. ')+q.explanation;});$('quiz-result').textContent=`Resultado: ${score}/${quizData.length} (${Math.round(score/quizData.length*100)}%). Puedes revisar y volver a intentar.`;});
$('reset-quiz').addEventListener('click',()=>{renderQuiz();$('quiz-result').textContent='Nuevo intento: responde todas las preguntas.';});
const activityChecks=[...document.querySelectorAll('[data-activity-done]')];function progress(){const done=activityChecks.filter(x=>x.checked).length;$('activity-progress').value=done;$('activity-count').textContent=done+'/3 misiones declaradas completas (autorreporte).';}
activityChecks.forEach(c=>c.addEventListener('change',progress));
$('export-work').addEventListener('click',()=>{const text=lesson.title+'\n\n'+lesson.activities.map((a,i)=>a.title+'\nEstado declarado: '+(activityChecks[i].checked?'completa':'en proceso')+'\n'+$('evidence-'+i).value).join('\n\n')+'\n\n'+$('quiz-result').textContent;const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mi-trabajo-'+lesson.kind+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
