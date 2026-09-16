import Image from "next/image";
import { ArrowUpRight, Camera, MapPin, Newspaper, Play, Mail, Menu } from "lucide-react";

const images = [
  "https://i.ibb.co.com/6050Yk2h/FB-IMG-1789535350131.jpg",
  "https://i.ibb.co.com/LDfs2p4Q/FB-IMG-1789535332845.jpg",
  "https://i.ibb.co.com/zTN1b6nj/FB-IMG-1789535279604.jpg"
];

const coverage = [
  "Politics", "National Affairs", "Field Reporting", "Breaking News",
  "Multimedia Journalism", "Public Interest Stories", "Local Reporting", "Photojournalism"
];

export default function Home() {
  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-[#DDD8CF] bg-[#F7F5F0]/95 backdrop-blur">
        <div className="container flex h-18 items-center justify-between gap-6">
          <a href="#home" className="serif text-xl font-bold">Asadullah Galib Al Sadi</a>
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider md:flex">
            {["About","Reports","Features","Photography","Videos","Field Work","FAQ","Contact"].map(x =>
              <a key={x} href={`#${x.toLowerCase().replace(" ","-")}`} className="hover:text-[#9E1B32]">{x}</a>
            )}
          </nav>
          <a className="hidden text-xs font-bold md:block" href="#contact">EN <span className="text-[#9E1B32]">| বাংলা</span></a>
          <button aria-label="Open menu" className="md:hidden"><Menu size={22}/></button>
        </div>
      </header>

      <section id="home" className="border-b border-[#DDD8CF]">
        <div className="container grid min-h-[720px] items-center gap-12 py-16 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="eyebrow mb-6">Journalist & Multimedia Reporter</div>
            <h1 className="serif max-w-4xl text-5xl font-bold leading-[.98] sm:text-6xl lg:text-8xl">
              Asadullah<br/>Galib Al Sadi
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#666]">
              Bangladesh-based journalist and multimedia reporter covering politics, national affairs, field reporting and major events across the country.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#reports" className="btn btn-primary">View Reports <ArrowUpRight size={15}/></a>
              <a href="#about" className="btn">About Me</a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#DDD8CF] pt-5 text-sm">
              <span><b>Daily Ittefaq</b>, Digital Department</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14}/> Dhaka, Bangladesh</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-4 border border-[#B89B5E]"></div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd]">
              <Image src={images[0]} alt="Asadullah Galib Al Sadi" fill className="object-cover" priority sizes="(max-width: 768px) 90vw, 520px"/>
            </div>
          </div>
        </div>
      </section>

      <section id="reports" className="section">
        <div className="container">
          <div className="flex items-end justify-between border-b border-[#DDD8CF] pb-5">
            <div><div className="eyebrow">Selected Work</div><h2 className="serif mt-2 text-4xl font-bold">Featured Reports</h2></div>
            <a href="#contact" className="hidden text-sm font-bold md:block">View archive →</a>
          </div>
          <div className="grid gap-5 pt-8 md:grid-cols-3">
            {["Field reporting & major events","National affairs & public interest","Multimedia news reporting"].map((title,i)=>(
              <article className="card overflow-hidden" key={title}>
                <div className="relative aspect-[16/10]"><Image src={images[i]} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/></div>
                <div className="p-6"><div className="eyebrow">Report</div><h3 className="serif mt-2 text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#666]">Published work and field reporting archive. Content details can be managed through the CMS.</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section bg-[#111] text-white">
        <div className="container grid gap-12 md:grid-cols-[.7fr_1.3fr]">
          <div><div className="eyebrow !text-[#B89B5E]">About</div><h2 className="serif mt-3 text-5xl font-bold">The reporter behind the work.</h2></div>
          <div className="text-lg leading-8 text-white/75">
            <p>Asadullah Galib Al Sadi is a Bangladeshi journalist currently working as a reporter in the Digital Department of Daily Ittefaq in Dhaka.</p>
            <p className="mt-5">Based in Dhaka, he travels across Bangladesh for assignments and has covered reporting work in 34 districts.</p>
            <div className="mt-8 grid gap-6 border-t border-white/20 pt-7 sm:grid-cols-3">
              <div><b className="block text-3xl text-white">34</b><span className="text-sm">Districts covered</span></div>
              <div><b className="block text-3xl text-white">Digital</b><span className="text-sm">Newsroom reporting</span></div>
              <div><b className="block text-3xl text-white">BD</b><span className="text-sm">Based in Bangladesh</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="field-work" className="section">
        <div className="container">
          <div className="eyebrow">From the Field</div>
          <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="serif text-5xl font-bold">34 Districts Covered</h2>
            <span className="text-sm text-[#666]">District records will be managed from the CMS.</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {["Dhaka","Gazipur","Mymensingh","Gopalganj","Tangail","Narayanganj","Chattogram","Sylhet","Rajshahi","Khulna","Barishal","Rangpur"].map(d=>
              <div key={d} className="border border-[#DDD8CF] bg-white p-4 text-sm font-bold">{d}</div>
            )}
          </div>
        </div>
      </section>

      <section id="photography" className="section border-y border-[#DDD8CF]">
        <div className="container">
          <div className="eyebrow">Visual Journalism</div><h2 className="serif mt-2 text-5xl font-bold">Photography</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {images.map((src,i)=><div key={src} className="relative aspect-[4/5] overflow-hidden"><Image src={src} alt={`Photography portfolio image ${i+1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/></div>)}
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container grid gap-10 md:grid-cols-2">
          <div><div className="eyebrow">Features & Opinion</div><h2 className="serif mt-2 text-5xl font-bold">Beyond the daily headline.</h2></div>
          <div className="border-t border-[#DDD8CF]">
            {["Feature","Opinion","Long-form","Special Report"].map(x=><div key={x} className="flex items-center justify-between border-b border-[#DDD8CF] py-5"><span className="serif text-2xl">{x}</span><ArrowUpRight size={18}/></div>)}
          </div>
        </div>
      </section>

      <section id="videos" className="section bg-[#EEEAE2]">
        <div className="container">
          <div className="eyebrow">Multimedia</div><h2 className="serif mt-2 text-5xl font-bold">Videos</h2>
          <div className="mt-8 card flex min-h-44 items-center justify-center"><div className="flex items-center gap-3 text-sm font-bold"><Play fill="currentColor" size={18}/> Video archive will appear here</div></div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container grid gap-10 md:grid-cols-[.7fr_1.3fr]">
          <div><div className="eyebrow">FAQ</div><h2 className="serif mt-2 text-5xl font-bold">Frequently asked questions.</h2></div>
          <div>{[
            ["Who is Asadullah Galib Al Sadi?","A Bangladesh-based journalist and multimedia reporter."],
            ["Where does he work?","Daily Ittefaq, Digital Department."],
            ["What does he cover?","Politics, national affairs, field reporting, breaking news, multimedia and public-interest stories."],
            ["Where can his published reports be found?","His published work can be connected to the original publication links in the portfolio archive."]
          ].map(([q,a])=><details key={q} className="border-b border-[#DDD8CF] py-5"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-3 text-[#666]">{a}</p></details>)}</div>
        </div>
      </section>

      <section id="contact" className="section bg-[#9E1B32] text-white">
        <div className="container grid gap-10 md:grid-cols-2">
          <div><div className="eyebrow !text-white/70">Contact</div><h2 className="serif mt-3 text-6xl font-bold">Get in touch.</h2><p className="mt-5 max-w-lg text-white/75">For professional inquiries, reporting collaboration and media-related communication.</p></div>
          <div className="flex items-center md:justify-end"><a href="mailto:" className="btn border-white text-white hover:bg-white hover:text-[#111]"><Mail size={15}/> Contact</a></div>
        </div>
      </section>

      <footer className="bg-[#111] py-10 text-white">
        <div className="container flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div><div className="serif text-xl font-bold">Asadullah Galib Al Sadi</div><div className="mt-1 text-sm text-white/55">Journalist & Multimedia Reporter · Daily Ittefaq, Digital Department</div></div>
          <div className="text-xs text-white/45">© {new Date().getFullYear()} Asadullah Galib Al Sadi</div>
        </div>
      </footer>
    </main>
  );
}