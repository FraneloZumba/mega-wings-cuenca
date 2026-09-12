"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "593XXXXXXXXX"; // Reemplazar con el oficial
const INSTAGRAM_URL = "https://instagram.com/megawingscue";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Plaza+Roma,+Calle+Roma+y+Gonzalez+Suarez,+Cuenca,+Ecuador";

const NAV = [["Inicio","#inicio"],["El plan","#plan"],["Menú","#menu"],["Promos","#promos"],["Mood","#mood"],["Ubicación","#ubicacion"]] as const;
const MENU = [
  {n:"01",name:"ALITAS",copy:"El clásico del plan: crujientes, bañadas y listas para elegir tu salsa.",img:"/wings-generic.jpg"},
  {n:"02",name:"MEGA BYTES",copy:"Bocados de pollo para picar, compartir y volver a pedir.",img:"/wings-generic.jpg"},
  {n:"03",name:"PAPAS",copy:"El side obligatorio. Doradas, calientes y hechas para el centro de la mesa.",img:"/wings-generic.jpg"},
  {n:"04",name:"MICHES & JUGOS",copy:"Porque el plan no se arma solo con comida. Algo frío siempre entra mejor.",img:"/wings-generic.jpg"},
];

function wa(message:string){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}

function SafeImage({src,alt,priority=false}:{src:string;alt:string;priority?:boolean}){
  const [error,setError]=useState(false);
  if(error) return <div className="fallback" role="img" aria-label={alt}><b>MEGA<br/>WINGS</b></div>;
  return <Image src={src} alt={alt} fill priority={priority} sizes="(max-width:760px) 100vw,50vw" onError={()=>setError(true)}/>;
}

function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
  const ref=useRef<HTMLDivElement>(null); const [show,setShow]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return; if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setShow(true);return;}
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShow(true);obs.disconnect()}},{threshold:.12,rootMargin:"0px 0px -8% 0px"});obs.observe(el);return()=>obs.disconnect();},[]);
  return <div ref={ref} className={`reveal ${show?"show":""} ${className}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>
}

export default function Page(){
  const [menuOpen,setMenuOpen]=useState(false);
  return <>
    <header className="nav"><div className="container navin">
      <a href="#inicio" className="brand"><span className="logo"><SafeImage src="/logo.png" alt="Mega Wings"/></span><b>MEGA WINGS</b></a>
      <nav>{NAV.map(([l,h])=><a key={h} href={h}>{l}</a>)}</nav>
      <a className="orderTop" href={wa("Hola Mega Wings, quiero hacer un pedido")}>PEDIR ↗</a>
      <button className="hamb" onClick={()=>setMenuOpen(v=>!v)} aria-label="Abrir menú"><i/><i/></button>
    </div><div className={`mobile ${menuOpen?"open":""}`}>{NAV.map(([l,h])=><a key={h} href={h} onClick={()=>setMenuOpen(false)}>{l}</a>)}<a href={wa("Hola Mega Wings, quiero hacer un pedido")}>PEDIR AHORA ↗</a></div></header>

    <main>
      <section className="hero" id="inicio">
        <div className="heroCopy">
          <Reveal><span className="eyebrow dark">MEGA WINGS · CUENCA</span></Reveal>
          <Reveal delay={70}><h1>EL PLAN<span>PERFECTO</span>ESTÁ AQUÍ.</h1></Reveal>
          <Reveal delay={140}><p>Alitas · Miches · Bytes · Jugos · Buena vibra.<br/>Todo lo que necesitas para que el plan sí se arme.</p></Reveal>
          <Reveal delay={200} className="actions"><a className="btn black" href="#menu">VER MENÚ</a><a className="btn white" href={wa("Hola Mega Wings, quiero hacer un pedido")}>PEDIR POR WHATSAPP ↗</a></Reveal>
          <Reveal delay={260}><div className="meta">PLAZA ROMA · CUENCA <i/> #MEGAWINGSCUENCA</div></Reveal>
        </div>
        <div className="heroMedia"><div className="mainPhoto"><SafeImage src="/wings-generic.jpg" alt="Alitas Mega Wings" priority/></div><div className="smallPhoto"><SafeImage src="/wings-generic.jpg" alt="Amigos en Mega Wings"/></div><div className="sticker">🔥<b>JALAS<br/>UNAS ALAS?</b></div></div>
      </section>

      <div className="ticker"><div>{Array.from({length:2}).map((_,i)=><span key={i}>ALITAS · MICHES · BYTES · PAPAS · PANAS · FÚTBOL · BUENA VIBRA · </span>)}</div></div>

      <section className="section plan" id="plan"><div className="container split"><Reveal><span className="eyebrow dark">MEGA WINGS MOOD</span><h2 className="display">NO ES SOLO<span>COMER.</span>ES EL PLAN.</h2></Reveal><Reveal delay={100} className="planText"><p>Aquí se viene a pedir alitas, elegir salsa, compartir papas, ver el partido y quedarse un rato más. Simple.</p><div className="steps"><div><span>01</span><b>VEN CON PANAS</b></div><div><span>02</span><b>PIDE AL CENTRO</b></div><div><span>03</span><b>QUE EMPIECE EL PARTIDO</b></div></div></Reveal></div>
      <div className="container gallery"><Reveal className="gBig"><SafeImage src="/wings-generic.jpg" alt="Clientes Mega Wings"/></Reveal><Reveal delay={80}><SafeImage src="/wings-generic.jpg" alt="Local Mega Wings"/></Reveal><Reveal delay={140}><SafeImage src="/wings-generic.jpg" alt="Alitas y papas"/></Reveal></div></section>

      <section className="section menuSec" id="menu"><div className="container"><Reveal className="head"><div><span className="eyebrow">LO BUENO</span><h2 className="display">JALAS<br/>UNAS ALAS?</h2></div><p>Una selección para que la demo se sienta Mega Wings sin inventar una carta completa. El menú final se reemplaza con sus productos reales.</p></Reveal><div className="menuGrid">{MENU.map((x,i)=><Reveal key={x.name} delay={i*70} className="menuCard"><div className="menuImg"><SafeImage src={x.img} alt={x.name}/><span>{x.n}</span></div><div className="menuCopy"><h3>{x.name}</h3><p>{x.copy}</p><a href={wa(`Hola Mega Wings, quiero pedir ${x.name}`)}>PEDIR ↗</a></div></Reveal>)}</div></div></section>

      <section className="sauces"><div className="sauceImg"><SafeImage src="/wings-generic.jpg" alt="Salsas Mega Wings"/></div><div className="sauceCopy"><Reveal><span className="eyebrow dark">PICK YOUR SAUCE</span><h2 className="display">DIP.<span>BITE.</span>REPEAT.</h2><p>Aquí la salsa no es acompañante: es parte del ritual.</p></Reveal></div></section>

      <section className="section promos" id="promos"><div className="container"><Reveal><span className="eyebrow dark">WHAT'S THE DEAL?</span><h2 className="display promoTitle">HOY TOCA<span>MEGA.</span></h2></Reveal><div className="promoGrid"><Reveal className="promoCard"><div className="promoImg"><SafeImage src="/wings-generic.jpg" alt="Promo partido"/></div><div><small>MATCH DAY</small><h3>MODO PARTIDO</h3><p>Fútbol, panas, alitas y promos para que el marcador importe un poquito menos.</p><a href={wa("Hola Mega Wings, ¿qué promo tienen activa hoy?")}>VER PROMO ACTUAL ↗</a></div></Reveal><Reveal delay={100} className="promoCard"><div className="promoImg"><SafeImage src="/wings-generic.jpg" alt="Promo Mega Wings"/></div><div><small>WEEK DEAL</small><h3>HOY TOCA MEGA</h3><p>Un espacio pensado para mantener siempre visible la promo activa del momento.</p><a href={wa("Hola Mega Wings, ¿qué promo tienen activa hoy?")}>VER PROMO ACTUAL ↗</a></div></Reveal></div></div></section>

      <section className="section mood" id="mood"><div className="container"><Reveal><span className="eyebrow">MEGA MOOD</span><h2 className="display moodTitle">COME.<span>WATCH.</span>REPEAT.</h2></Reveal><div className="moodGrid"><Reveal className="moodBig"><SafeImage src="/wings-generic.jpg" alt="Clientes Mega Wings"/></Reveal><Reveal delay={70}><SafeImage src="/wings-generic.jpg" alt="Partido Mega Wings"/></Reveal><Reveal delay={120} className="quote">“EL PLAN PERFECTO ESTÁ AQUÍ.”<small>MEGA WINGS CUENCA</small></Reveal><Reveal delay={170}><SafeImage src="/wings-generic.jpg" alt="Buena vibra Mega Wings"/></Reveal></div></div></section>

      <section className="section location" id="ubicacion"><div className="container split"><Reveal><span className="eyebrow dark">¿DÓNDE ARMAMOS EL PLAN?</span><h2 className="display locationTitle">PLAZA<span>ROMA.</span></h2></Reveal><Reveal delay={100} className="info"><div><b>UBICACIÓN</b><p>Plaza Roma<br/>Calle Roma y González Suárez<br/>Cuenca, Ecuador</p></div><div><b>INSTAGRAM</b><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@megawingscue ↗</a></div><div><b>HORARIOS</b><p>Consulta el horario vigente antes de tu visita.</p></div><div className="locActions"><a className="btn black" href={MAP_URL} target="_blank" rel="noreferrer">CÓMO LLEGAR ↗</a><a className="btn outline" href={wa("Hola Mega Wings, quisiera información")}>WHATSAPP</a></div></Reveal></div></section>

      <section className="final"><Reveal><span className="eyebrow dark">NO LE DES MÁS VUELTAS</span><h2 className="display">ARMA<span>EL PLAN.</span></h2><a className="finalBtn" href={wa("Hola Mega Wings, quiero hacer un pedido")}>PEDIR AHORA <span>↗</span></a></Reveal></section>
    </main>

    <footer><div className="container foot"><div className="footLogo">MEGA<span>WINGS</span></div><div className="footLinks"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={wa("Hola Mega Wings")}>WHATSAPP ↗</a><a href={MAP_URL} target="_blank" rel="noreferrer">UBICACIÓN ↗</a></div></div><div className="container footBottom"><span>© 2026 MEGA WINGS CUENCA</span><span>ALITAS · MICHES · BYTES · JUGOS · BUENA VIBRA</span></div></footer>
  </>
}
