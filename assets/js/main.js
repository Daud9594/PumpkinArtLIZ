
document.addEventListener('DOMContentLoaded',()=>{
  // load content
  fetch('data/content.json').then(r=>r.json()).then(d=>{ document.querySelectorAll('#heroTitle').forEach(el=>el.textContent=d.heroTagline||el.textContent); document.querySelectorAll('#mailLink').forEach(el=>el.href='mailto:'+d.contactEmail) });

  // logo svg
  fetch('assets/images/logo/logo-inline.svg').then(r=>r.text()).then(t=>{ const lc=document.getElementById('logoContainer'); if(lc) lc.innerHTML=t; try{ const texts=lc.querySelectorAll('text'); texts.forEach(t=>{ t.style.strokeDasharray='1000'; t.style.strokeDashoffset='1000'; }); if(window.gsap){ gsap.to(Array.from(texts).map(p=>p.style),{strokeDashoffset:0,duration:1.6,stagger:0.12}); setTimeout(()=>texts.forEach(p=>p.style.fill='#2f2f2f'),1500); } }catch(e){} });

  // load gallery into grids
  fetch('data/gallery.json').then(r=>r.json()).then(items=>{
    const preview=document.getElementById('previewGrid'); if(preview){ items.slice(0,6).forEach(it=>{ const a=document.createElement('a'); a.className='item'; a.href=it.src; const img=document.createElement('img'); img.src=it.src; img.alt=it.title; a.appendChild(img); preview.appendChild(a); a.addEventListener('click',e=>{ e.preventDefault(); openLightbox(it); }); }); }
    const gg=document.getElementById('galleryGrid'); if(gg){ items.forEach(it=>{ const a=document.createElement('a'); a.className='item'; a.href=it.src; const img=document.createElement('img'); img.src=it.src; img.alt=it.title; a.appendChild(img); gg.appendChild(a); a.addEventListener('click',e=>{ e.preventDefault(); openLightbox(it); }); }); }
  });

  window.openLightbox = (it)=>{ const lb=document.getElementById('lightbox'); if(!lb) return; const img=document.getElementById('lightboxImg'); img.src=it.src; img.alt=it.title; lb.classList.add('open'); };
  document.addEventListener('click', e=>{ if(e.target.classList.contains('lightbox')||e.target.classList.contains('close')) document.getElementById('lightbox')?.classList.remove('open'); });

  // before after
  const baGrid=document.getElementById('baGrid'); if(baGrid){ fetch('data/before_after.json').then(r=>r.json()).then(items=>{ items.forEach(it=>{ const c=document.createElement('div'); c.className='card'; const wrap=document.createElement('div'); wrap.style.position='relative'; wrap.style.overflow='hidden'; const b=document.createElement('img'); b.src=it.photo; b.style.width='100%'; const a=document.createElement('img'); a.src=it.drawing; a.style.position='absolute'; a.style.top='0'; a.style.left='0'; a.style.width='100%'; a.style.clipPath='inset(0 50% 0 0)'; const range=document.createElement('input'); range.type='range'; range.min=0; range.max=100; range.value=50; range.style.width='100%'; range.addEventListener('input', ()=> a.style.clipPath='inset(0 '+(100-range.value)+'% 0 0)'); wrap.appendChild(b); wrap.appendChild(a); c.appendChild(wrap); c.appendChild(range); const p=document.createElement('p'); p.textContent=it.caption||''; c.appendChild(p); baGrid.appendChild(c); }); }); }

  // cart simple
  const CART='pumpkin_cart_v1'; function getCart(){ try{return JSON.parse(localStorage.getItem(CART))||[];}catch(e){return []} } function saveCart(c){ localStorage.setItem(CART,JSON.stringify(c)); updateCount(); }
  function addToCart(item){ const c=getCart(); c.push(item); saveCart(c); alert('Added to cart'); }
  function updateCount(){ const el=document.getElementById('cartCount'); if(el) el.textContent=getCart().length; }
  updateCount();

  document.addEventListener('click', e=>{ if(e.target.classList.contains('add-product')){ const id=e.target.dataset.id; fetch('data/products.json').then(r=>r.json()).then(items=>{ const p=items.find(x=>x.id==id); if(p) addToCart(p); }); } });
});
