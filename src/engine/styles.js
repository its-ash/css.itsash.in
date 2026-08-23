export const STYLE_IDS = [
  'default','flat','material','neumorphism','glassmorphism','brutalism',
  'maximalism','skeuomorphism','skeuominimalism','dark-highcontrast',
  'retro-8bit','cyberpunk','claymorphism','bauhaus','organic','typographic',
  'minimalism-mono','papercut','skeuomorphism-classic',
];

export const STYLE_LABELS = {
  'default': 'Default',
  'flat': 'Flat Design',
  'material': 'Material Design',
  'neumorphism': 'Neomorphism',
  'glassmorphism': 'Glassmorphism',
  'brutalism': 'Brutalism / Neo-Brutalism',
  'maximalism': 'Maximalism',
  'skeuomorphism': 'Skeuomorphism',
  'skeuominimalism': 'Skeuominimalism',
  'dark-highcontrast': 'Dark Mode / High Contrast',
  'retro-8bit': 'Retro / 8-Bit (Pixel Art)',
  'cyberpunk': 'Cyberpunk / Synthwave (Neon Glow)',
  'claymorphism': 'Memorphism (3D Cartoon / Claymorphism)',
  'bauhaus': 'Bauhaus / Swiss Style (Grid-Based)',
  'organic': 'Organic / Biomorphic (Fluid Shapes)',
  'typographic': 'Typographic / Text-First',
  'minimalism-mono': 'Minimalism (Monochrome)',
  'papercut': 'Papercut / Layered Vector',
  'skeuomorphism-classic': 'Skeuomorphism (Classic 3D)',
};

export const STYLE_CSS = {
'default': ``,

'flat': `
:root{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 2px var(--primary)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
.card,.alert,.dropdown-menu,.modal-container,.toast,.accordion-item,.fieldset{box-shadow:none!important;border:1px solid var(--border)!important;border-radius:var(--radius-md)!important}
.btn{box-shadow:none!important;border:1px solid var(--border)!important;border-radius:var(--radius-md)!important}.btn:active{transform:translateY(0)!important}
input,textarea,select{box-shadow:none!important;border:1px solid var(--border)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:0 0 0 2px var(--primary)!important}
.badge,.tag,.chip{box-shadow:none!important;border:1px solid var(--border)!important}
pre{box-shadow:none!important;border:1px solid var(--border)!important}
code{box-shadow:none!important}
.navbar{box-shadow:none!important;border-bottom:1px solid var(--border)}
.progress{box-shadow:none!important;border:1px solid var(--border)!important}
`,

'material': `
:root{--radius-sm:2px;--radius-md:4px;--radius-lg:8px;--radius-xl:12px;--shadow-xs:0 1px 2px rgba(0,0,0,.12);--shadow-sm:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.08);--shadow-md:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.12);--shadow-lg:0 10px 20px rgba(0,0,0,.14),0 6px 6px rgba(0,0,0,.10);--shadow-xl:0 14px 28px rgba(0,0,0,.18),0 10px 10px rgba(0,0,0,.12);--shadow-2xl:0 24px 48px rgba(0,0,0,.22),0 12px 12px rgba(0,0,0,.14)}
[data-theme="dark"]{--shadow-xs:0 1px 2px rgba(0,0,0,.3);--shadow-sm:0 1px 3px rgba(0,0,0,.3);--shadow-md:0 3px 6px rgba(0,0,0,.35);--shadow-lg:0 10px 20px rgba(0,0,0,.4);--shadow-xl:0 14px 28px rgba(0,0,0,.45);--shadow-2xl:0 24px 48px rgba(0,0,0,.5)}
.card{border:none!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;border-radius:4px!important;text-transform:uppercase;letter-spacing:.04em;font-weight:600;box-shadow:var(--shadow-sm)!important}
.btn:active{box-shadow:var(--shadow-xs)!important;transform:translateY(1px)!important}
.btn-primary,.btn-accent,.btn-success,.btn-warning,.btn-danger{box-shadow:var(--shadow-md)!important}
input,textarea,select{border:none!important;border-bottom:2px solid var(--border)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding-left:0;padding-right:0}
input:focus,textarea:focus,select:focus{border-bottom-color:var(--primary)!important;box-shadow:none!important}
.field-label{background:transparent!important}
.field-label::before{background:transparent!important}
.field input:not(:placeholder-shown)~.field-label,.field input:focus~.field-label{background:transparent!important}
.navbar{box-shadow:var(--shadow-sm)!important;border:none!important}
.tab.active{border-bottom:2px solid var(--primary)!important}
.badge{border-radius:4px!important}
.chip{border-radius:4px!important}
.alert{border-radius:var(--radius-md)!important;box-shadow:var(--shadow-sm)!important;border:none!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
`,

'neumorphism': `
:root{--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px;--shadow-xs:inset 2px 2px 4px rgba(0,0,0,.08),inset -2px -2px 4px rgba(255,255,255,.8);--shadow-sm:4px 4px 8px rgba(0,0,0,.1),-4px -4px 8px rgba(255,255,255,.8);--shadow-md:6px 6px 12px rgba(0,0,0,.12),-6px -6px 12px rgba(255,255,255,.8);--shadow-lg:8px 8px 16px rgba(0,0,0,.14),-8px -8px 16px rgba(255,255,255,.8);--shadow-xl:12px 12px 24px rgba(0,0,0,.16),-12px -12px 24px rgba(255,255,255,.8);--shadow-2xl:16px 16px 32px rgba(0,0,0,.18),-16px -16px 32px rgba(255,255,255,.8);--shadow-inner:inset 3px 3px 6px rgba(0,0,0,.12),inset -3px -3px 6px rgba(255,255,255,.8);--shadow-focus:inset 0 0 0 2px var(--primary)}
[data-theme="dark"]{--shadow-xs:inset 2px 2px 4px rgba(0,0,0,.3),inset -2px -2px 4px rgba(255,255,255,.05);--shadow-sm:4px 4px 8px rgba(0,0,0,.3),-4px -4px 8px rgba(255,255,255,.05);--shadow-md:6px 6px 12px rgba(0,0,0,.35),-6px -6px 12px rgba(255,255,255,.06);--shadow-lg:8px 8px 16px rgba(0,0,0,.4),-8px -8px 16px rgba(255,255,255,.07);--shadow-xl:12px 12px 24px rgba(0,0,0,.45),-12px -12px 24px rgba(255,255,255,.08);--shadow-2xl:16px 16px 32px rgba(0,0,0,.5),-16px -16px 32px rgba(255,255,255,.09);--shadow-inner:inset 3px 3px 6px rgba(0,0,0,.4),inset -3px -3px 6px rgba(255,255,255,.06)}
.card{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-sm)!important;color:var(--text)!important;border-radius:var(--radius-md)!important}
.btn:hover{box-shadow:var(--shadow-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:none!important}
.btn-primary{background:var(--primary)!important;color:var(--primary-foreground)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{box-shadow:var(--shadow-lg)!important;background:var(--primary-hover)!important}
input,textarea,select{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-inner)!important;color:var(--text)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-inner)!important;border:none!important}
.field-label::before{background:var(--background)!important}
.field input:focus~.field-label::before,.field input:not(:placeholder-shown)~.field-label::before,.field textarea:focus~.field-label::before,.field textarea:not(:placeholder-shown)~.field-label::before{background:var(--background)!important}
.badge,.tag,.chip{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.progress,.spinner{box-shadow:var(--shadow-inner)!important}
.alert{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.dropdown-menu,.modal-container,.toast{background:var(--background)!important;border:none!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
fieldset{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.file-upload{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-lg)!important}
pre,code{background:var(--background)!important;box-shadow:var(--shadow-inner)!important;border:none!important}
.navbar{box-shadow:none!important;background:var(--background)!important;border:none!important}
hr{display:none}
`,

'glassmorphism': `
:root{--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px;--shadow-xs:0 2px 8px rgba(0,0,0,.06);--shadow-sm:0 4px 16px rgba(0,0,0,.08);--shadow-md:0 8px 32px rgba(0,0,0,.1),0 2px 8px rgba(0,0,0,.06);--shadow-lg:0 12px 40px rgba(0,0,0,.12),0 4px 12px rgba(0,0,0,.08);--shadow-xl:0 20px 56px rgba(0,0,0,.16),0 8px 24px rgba(0,0,0,.1);--shadow-2xl:0 28px 72px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.12)}
body{backdrop-filter:blur(20px) saturate(1.4)}
.card,.alert,.dropdown-menu,.modal-container,.toast,.fieldset{background:color-mix(in srgb,var(--surface) 60%,transparent)!important;backdrop-filter:blur(16px) saturate(1.3)!important;border:1px solid color-mix(in srgb,var(--border) 50%,transparent)!important;box-shadow:var(--shadow-md),inset 0 1px 0 color-mix(in srgb,white 15%,transparent)!important;border-radius:var(--radius-lg)!important}
[data-theme="dark"] .card,[data-theme="dark"] .alert,[data-theme="dark"] .dropdown-menu,[data-theme="dark"] .modal-container,[data-theme="dark"] .toast,[data-theme="dark"] fieldset{border-color:color-mix(in srgb,var(--border) 40%,transparent)!important;box-shadow:var(--shadow-md),inset 0 1px 0 color-mix(in srgb,white 5%,transparent)!important}
.card-bordered{border:1px solid color-mix(in srgb,var(--border) 50%,transparent)!important}
.btn{background:color-mix(in srgb,var(--surface) 50%,transparent)!important;backdrop-filter:blur(12px)!important;border:1px solid color-mix(in srgb,var(--border) 40%,transparent)!important;box-shadow:var(--shadow-xs),inset 0 1px 0 color-mix(in srgb,white 10%,transparent)!important;border-radius:var(--radius-md)!important}
.btn-primary{background:color-mix(in srgb,var(--primary) 80%,transparent)!important;border-color:color-mix(in srgb,var(--primary) 60%,transparent)!important;backdrop-filter:blur(12px)!important}
.btn:hover{box-shadow:var(--shadow-sm),inset 0 1px 0 color-mix(in srgb,white 12%,transparent)!important}
input,textarea,select{background:color-mix(in srgb,var(--surface) 40%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 40%,transparent)!important;border-radius:var(--radius-md)!important}
.navbar{background:color-mix(in srgb,var(--surface) 50%,transparent)!important;backdrop-filter:blur(20px) saturate(1.5)!important;border-bottom:1px solid color-mix(in srgb,var(--border) 30%,transparent)!important}
pre{background:color-mix(in srgb,var(--surface) 40%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 30%,transparent)!important;border-radius:var(--radius-md)!important}
code{background:color-mix(in srgb,var(--surface-active) 40%,transparent)!important;backdrop-filter:blur(4px)!important;border-radius:var(--radius-sm)!important}
.badge,.tag,.chip{background:color-mix(in srgb,var(--surface) 50%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 30%,transparent)!important}
.file-upload{background:color-mix(in srgb,var(--surface) 40%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 40%,transparent)!important;border-radius:var(--radius-lg)!important}
input[type="range"]::-webkit-slider-runnable-track{background:color-mix(in srgb,var(--surface-active) 50%,transparent)!important;backdrop-filter:blur(4px)!important}
`,

'brutalism': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--radius-full:0;--shadow-xs:2px 2px 0 var(--contrast);--shadow-sm:3px 3px 0 var(--contrast);--shadow-md:4px 4px 0 var(--contrast);--shadow-lg:6px 6px 0 var(--contrast);--shadow-xl:8px 8px 0 var(--contrast);--shadow-2xl:12px 12px 0 var(--contrast);--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary)}
[data-theme="dark"]{--shadow-xs:2px 2px 0 #fff;--shadow-sm:3px 3px 0 #fff;--shadow-md:4px 4px 0 #fff;--shadow-lg:6px 6px 0 #fff;--shadow-xl:8px 8px 0 #fff;--shadow-2xl:12px 12px 0 #fff}
body{font-weight:600}
h1,h2,h3,h4,h5,h6{font-weight:900;letter-spacing:-.03em;text-transform:uppercase;line-height:1}
.card,.alert,.fieldset{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-md)!important;border-radius:0!important}
.card-bordered{border:2px solid var(--contrast)!important}
.btn{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important;font-weight:800;text-transform:uppercase;letter-spacing:.02em}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.btn:active{box-shadow:none!important;transform:translate(2px,2px)!important}
input,textarea,select{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-xs)!important;border-radius:0!important;font-weight:600}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-sm)!important;border-color:var(--primary)!important}
.badge,.tag,.chip{border:2px solid var(--contrast)!important;border-radius:0!important;font-weight:800;box-shadow:var(--shadow-xs)!important}
.dropdown-menu,.modal-container,.toast{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-lg)!important;border-radius:0!important}
pre{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important}
code{border:1px solid var(--contrast)!important;border-radius:0!important}
.navbar{border-bottom:2px solid var(--contrast);box-shadow:none!important}
.tab{border:2px solid transparent!important;border-radius:0!important}
.tab.active{border:2px solid var(--contrast)!important;border-bottom:none!important}
.pagination .page-link{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-xs)!important}
.file-upload{border:2px dashed var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
.progress{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-xs)!important}
.progress-bar{border-right:1px solid var(--contrast)}
.accordion-item{border:2px solid var(--contrast)!important;border-radius:0!important}
.accordion-trigger{border:none!important;border-radius:0!important}
fieldset{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
hr{border-top:2px solid var(--contrast)}
`,

'maximalism': `
:root{--radius-sm:6px;--radius-md:14px;--radius-lg:24px;--radius-xl:32px;--radius-full:9999px;--shadow-xs:0 2px 6px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.2);--shadow-sm:0 4px 12px rgba(0,0,0,.12),0 1px 3px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.2);--shadow-md:0 8px 20px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.2);--shadow-lg:0 16px 40px rgba(0,0,0,.18),0 6px 16px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.22);--shadow-xl:0 24px 60px rgba(0,0,0,.22),0 12px 32px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.25);--shadow-2xl:0 32px 80px rgba(0,0,0,.26),0 16px 48px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.3)}
body{font-size:1.05rem;letter-spacing:-.01em}
h1{font-size:var(--font-size-5xl);font-weight:900;letter-spacing:-.04em}
h2{font-size:var(--font-size-4xl);font-weight:800;letter-spacing:-.03em}
h3{font-size:var(--font-size-3xl);font-weight:800}
h4{font-size:var(--font-size-2xl);font-weight:700}
.card{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-lg)!important;background:linear-gradient(135deg,var(--surface) 0%,var(--surface-elevated) 100%)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:2px solid var(--border-strong)!important}
.card-title{font-size:var(--font-size-xl);font-weight:900}
.btn{border:2px solid var(--border-strong)!important;font-weight:800;letter-spacing:-.01em;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-md)!important}
.btn-primary{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-hover) 100%)!important;border-color:var(--primary)!important;box-shadow:var(--shadow-lg)!important}
.btn-primary:hover{box-shadow:var(--shadow-xl)!important;transform:translateY(-2px)!important}
.btn-accent{background:linear-gradient(135deg,var(--accent) 0%,var(--accent-hover) 100%)!important;border-color:var(--accent)!important}
.badge{font-size:var(--font-size-sm);font-weight:800;box-shadow:var(--shadow-sm),inset 0 1px 0 rgba(255,255,255,.3)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-full)!important}
.alert{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.alert:hover{box-shadow:var(--shadow-lg)!important;transform:translateY(-1px)!important}
.alert-title{font-size:var(--font-size-md);font-weight:800}
.dropdown-menu,.modal-container,.toast{box-shadow:var(--shadow-xl)!important;border:2px solid var(--border-strong)!important;border-radius:var(--radius-lg)!important}
input,textarea,select{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-md)!important}
.navbar{background:linear-gradient(180deg,var(--surface) 0%,var(--background) 100%)!important;border-bottom:2px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important}
.nav-brand{font-size:var(--font-size-xl);font-weight:900}
pre{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.file-upload{border:3px dashed var(--border-strong)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.progress{height:.75rem;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-full)!important}
.chip{border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-full)!important}
.accordion-item{box-shadow:var(--shadow-sm)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-md)!important}
.accordion-trigger{font-size:var(--font-size-md);font-weight:800}
fieldset{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
`,

'skeuomorphism': `
:root{--radius-sm:4px;--radius-md:6px;--radius-lg:10px;--radius-xl:14px;--shadow-xs:0 1px 2px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.3);--shadow-sm:0 2px 4px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.3);--shadow-md:0 4px 8px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.08);--shadow-lg:0 8px 16px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.1);--shadow-xl:0 12px 28px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.12);--shadow-2xl:0 20px 48px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.14);--shadow-inner:inset 0 2px 4px rgba(0,0,0,.12),inset 0 -1px 0 rgba(255,255,255,.3)}
.card{border:1px solid var(--border)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 92%,white) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:translateY(1px)!important}
.btn-primary{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;border-color:var(--primary)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{background:linear-gradient(180deg,color-mix(in srgb,var(--primary-hover) 88%,white) 0%,var(--primary-hover) 100%)!important}
.btn-primary:active{background:linear-gradient(180deg,var(--primary) 0%,color-mix(in srgb,var(--primary) 85%,white) 100%)!important;box-shadow:var(--shadow-inner)!important}
input,textarea,select{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 2px var(--primary)!important;border-color:var(--primary)!important}
.badge,.chip{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.navbar{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border-bottom:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important}
pre{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
code{background:var(--surface-active)!important;border:1px solid var(--border)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.1)!important;border-radius:var(--radius-sm)!important}
.progress{box-shadow:var(--shadow-inner)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-sm)!important}
.progress-bar{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.3)!important}
.file-upload{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.dropdown-menu,.modal-container,.toast{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
fieldset{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
`,

'skeuominimalism': `
:root{--radius-sm:6px;--radius-md:8px;--radius-lg:12px;--shadow-xs:0 1px 2px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.15);--shadow-sm:0 2px 4px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.15);--shadow-md:0 4px 8px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.15);--shadow-lg:0 8px 16px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.15);--shadow-xl:0 12px 24px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.15);--shadow-2xl:0 16px 32px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.15);--shadow-inner:inset 0 1px 2px rgba(0,0,0,.08),inset 0 -1px 0 rgba(255,255,255,.1)}
.card{border:none!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-md)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:translateY(1px)!important}
.btn-primary{box-shadow:var(--shadow-md)!important}
.btn-primary:active{box-shadow:var(--shadow-inner)!important}
input,textarea,select{border:none!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 2px var(--primary)!important}
.field-label::before{background:var(--surface)!important}
.badge,.chip{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.progress{box-shadow:var(--shadow-inner)!important;border:none!important;border-radius:var(--radius-full)!important}
.dropdown-menu,.modal-container,.toast{border:none!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
pre{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
code{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
fieldset{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.file-upload{border:none!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
`,

'dark-highcontrast': `
:root{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary);--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
.card,.alert,.fieldset,.dropdown-menu,.modal-container,.toast{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.card-bordered{border:2px solid var(--text)!important}
.btn{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;font-weight:700}
.btn:active{transform:translate(2px,2px)!important}
.btn-primary{border-color:var(--text)!important}
input,textarea,select{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
input:focus,textarea:focus,select:focus{box-shadow:0 0 0 2px var(--primary)!important}
.badge,.tag,.chip{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
pre{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
code{border:1px solid var(--text)!important;border-radius:0!important}
.navbar{border-bottom:2px solid var(--text);box-shadow:none!important}
.file-upload{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.progress{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
.accordion-item{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
fieldset{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
hr{border-top:2px solid var(--text)}
a{text-decoration:underline;text-underline-offset:2px}
[data-theme="light"] body{background:#fff;color:#000}
[data-theme="dark"] body{background:#000;color:#fff}
`,

'retro-8bit': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--radius-full:0;--shadow-xs:2px 2px 0 var(--contrast);--shadow-sm:2px 2px 0 var(--contrast);--shadow-md:4px 4px 0 var(--contrast);--shadow-lg:4px 4px 0 var(--contrast);--shadow-xl:6px 6px 0 var(--contrast);--shadow-2xl:6px 6px 0 var(--contrast);--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary)}
[data-theme="dark"]{--shadow-xs:2px 2px 0 #fff;--shadow-sm:2px 2px 0 #fff;--shadow-md:4px 4px 0 #fff;--shadow-lg:4px 4px 0 #fff;--shadow-xl:6px 6px 0 #fff;--shadow-2xl:6px 6px 0 #fff}
body{font-family:var(--font-family-mono);letter-spacing:0}
h1,h2,h3,h4,h5,h6{font-family:var(--font-family-mono);letter-spacing:0;text-transform:uppercase;font-weight:700}
.card,.alert,.fieldset{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-md)!important;border-radius:0!important}
.card-bordered{border:2px solid var(--contrast)!important}
.btn{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important;font-family:var(--font-family-mono);font-weight:700;text-transform:uppercase;letter-spacing:0}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.btn:active{box-shadow:none!important;transform:translate(2px,2px)!important}
input,textarea,select{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-xs)!important;border-radius:0!important;font-family:var(--font-family-mono)}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-sm)!important;border-color:var(--primary)!important}
.badge,.tag,.chip{border:2px solid var(--contrast)!important;border-radius:0!important;font-family:var(--font-family-mono);font-weight:700;text-transform:uppercase;box-shadow:var(--shadow-xs)!important}
.dropdown-menu,.modal-container,.toast{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-lg)!important;border-radius:0!important}
pre{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important}
code{border:1px solid var(--contrast)!important;border-radius:0!important;font-family:var(--font-family-mono)}
.navbar{border-bottom:2px solid var(--contrast);box-shadow:none!important}
.tab{border:2px solid transparent!important;border-radius:0!important;font-family:var(--font-family-mono)}
.tab.active{border:2px solid var(--contrast)!important;border-bottom:none!important}
.file-upload{border:2px dashed var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
.progress{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:none!important}
fieldset{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
.accordion-item{border:2px solid var(--contrast)!important;border-radius:0!important}
.accordion-trigger{border-radius:0!important}
hr{border-top:2px solid var(--contrast)}
input[type="range"]::-webkit-slider-thumb{border-radius:0;border:2px solid var(--contrast)}
.form-check-box{border-radius:0!important;border:2px solid var(--contrast)!important}
`,

'cyberpunk': `
:root{--radius-sm:2px;--radius-md:4px;--radius-lg:6px;--shadow-xs:0 0 4px rgba(0,0,0,.3);--shadow-sm:0 0 8px rgba(0,0,0,.3),0 0 0 1px color-mix(in srgb,var(--primary) 40%,transparent);--shadow-md:0 0 16px rgba(0,0,0,.4),0 0 0 1px color-mix(in srgb,var(--primary) 50%,transparent);--shadow-lg:0 0 24px rgba(0,0,0,.5),0 0 0 1px color-mix(in srgb,var(--accent) 50%,transparent);--shadow-xl:0 0 32px rgba(0,0,0,.6),0 0 0 1px color-mix(in srgb,var(--accent) 60%,transparent);--shadow-2xl:0 0 48px rgba(0,0,0,.7),0 0 0 1px color-mix(in srgb,var(--primary) 60%,transparent);--shadow-inner:inset 0 0 8px rgba(0,0,0,.4),inset 0 0 0 1px color-mix(in srgb,var(--primary) 30%,transparent);--shadow-focus:0 0 0 2px var(--accent),0 0 12px color-mix(in srgb,var(--accent) 60%,transparent)}
[data-theme="light"] body{background:#0a0a12;color:#e0e0ff}
[data-theme="dark"] body{background:#0a0a12;color:#e0e0ff}
[data-theme="light"]{--background:#0a0a12;--surface:#12121f;--surface-elevated:#1a1a2e;--surface-hover:#1e1e34;--surface-active:#16162a;--text:#e0e0ff;--text-muted:#8888aa;--text-subtle:#555577;--border:#222238;--border-subtle:#18182e;--border-strong:#333355}
.card{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-md)!important;background:color-mix(in srgb,var(--surface) 90%,transparent)!important;border-radius:var(--radius-md)!important}
.card-bordered{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important}
.card-title{text-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)}
.btn{border:1px solid color-mix(in srgb,var(--primary) 50%,transparent)!important;box-shadow:var(--shadow-sm)!important;text-transform:uppercase;letter-spacing:.05em;font-weight:700;border-radius:var(--radius-sm)!important;background:color-mix(in srgb,var(--surface) 80%,transparent)!important}
.btn:hover{box-shadow:var(--shadow-md),0 0 12px color-mix(in srgb,var(--primary) 40%,transparent)!important}
.btn-primary{border-color:var(--primary)!important;box-shadow:var(--shadow-md),0 0 12px color-mix(in srgb,var(--primary) 50%,transparent)!important;text-shadow:0 0 6px var(--primary-foreground)!important;background:var(--primary)!important}
.btn-accent{border-color:var(--accent)!important;box-shadow:var(--shadow-md),0 0 12px color-mix(in srgb,var(--accent) 50%,transparent)!important;background:var(--accent)!important}
input,textarea,select{border:1px solid color-mix(in srgb,var(--primary) 30%,transparent)!important;box-shadow:var(--shadow-xs)!important;background:color-mix(in srgb,var(--surface) 90%,transparent)!important;border-radius:var(--radius-sm)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus)!important;border-color:var(--primary)!important}
h1,h2,h3,h4,h5,h6{text-shadow:0 0 12px color-mix(in srgb,var(--primary) 40%,transparent),0 0 24px color-mix(in srgb,var(--primary) 20%,transparent)}
.badge,.tag,.chip{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important;background:color-mix(in srgb,var(--surface) 90%,transparent)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.dropdown-menu,.modal-container,.toast{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-md)!important}
pre{border:1px solid color-mix(in srgb,var(--accent) 30%,transparent)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-sm)!important}
code{border:1px solid color-mix(in srgb,var(--accent) 30%,transparent)!important;text-shadow:0 0 4px color-mix(in srgb,var(--accent) 40%,transparent)!important;border-radius:var(--radius-sm)!important}
a{text-shadow:0 0 6px color-mix(in srgb,var(--primary) 40%,transparent)}
.navbar{border-bottom:1px solid color-mix(in srgb,var(--primary) 30%,transparent)!important;background:color-mix(in srgb,var(--surface) 80%,transparent)!important}
.progress-bar{box-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)!important}
.spinner{box-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)!important}
.file-upload{border:1px solid color-mix(in srgb,var(--primary) 30%,transparent)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
::selection{background:var(--accent);color:var(--background);text-shadow:0 0 8px var(--accent)}
`,

'claymorphism': `
:root{--radius-sm:16px;--radius-md:20px;--radius-lg:28px;--radius-xl:36px;--shadow-xs:inset 0 -2px 4px rgba(0,0,0,.06),inset 0 2px 4px rgba(255,255,255,.4),0 2px 4px rgba(0,0,0,.06);--shadow-sm:inset 0 -3px 6px rgba(0,0,0,.08),inset 0 3px 6px rgba(255,255,255,.5),0 4px 8px rgba(0,0,0,.08);--shadow-md:inset 0 -4px 8px rgba(0,0,0,.1),inset 0 4px 8px rgba(255,255,255,.5),0 6px 12px rgba(0,0,0,.1);--shadow-lg:inset 0 -6px 12px rgba(0,0,0,.1),inset 0 6px 12px rgba(255,255,255,.5),0 8px 20px rgba(0,0,0,.1);--shadow-xl:inset 0 -8px 16px rgba(0,0,0,.12),inset 0 8px 16px rgba(255,255,255,.5),0 12px 28px rgba(0,0,0,.12);--shadow-2xl:inset 0 -10px 20px rgba(0,0,0,.14),inset 0 10px 20px rgba(255,255,255,.5),0 16px 36px rgba(0,0,0,.14);--shadow-inner:inset 0 4px 8px rgba(0,0,0,.12),inset 0 -2px 4px rgba(255,255,255,.3);--shadow-focus:0 0 0 3px color-mix(in oklch,var(--primary) 30%,transparent)}
[data-theme="dark"]{--shadow-xs:inset 0 -2px 4px rgba(0,0,0,.2),inset 0 2px 4px rgba(255,255,255,.08),0 2px 4px rgba(0,0,0,.2);--shadow-sm:inset 0 -3px 6px rgba(0,0,0,.25),inset 0 3px 6px rgba(255,255,255,.1),0 4px 8px rgba(0,0,0,.25);--shadow-md:inset 0 -4px 8px rgba(0,0,0,.3),inset 0 4px 8px rgba(255,255,255,.1),0 6px 12px rgba(0,0,0,.3);--shadow-lg:inset 0 -6px 12px rgba(0,0,0,.3),inset 0 6px 12px rgba(255,255,255,.12),0 8px 20px rgba(0,0,0,.3);--shadow-xl:inset 0 -8px 16px rgba(0,0,0,.35),inset 0 8px 16px rgba(255,255,255,.12),0 12px 28px rgba(0,0,0,.35);--shadow-2xl:inset 0 -10px 20px rgba(0,0,0,.4),inset 0 10px 20px rgba(255,255,255,.14),0 16px 36px rgba(0,0,0,.4)}
.card{border:none!important;background:var(--surface)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;background:var(--surface)!important;box-shadow:var(--shadow-sm)!important;color:var(--text)!important;border-radius:var(--radius-md)!important}
.btn:hover{box-shadow:var(--shadow-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:none!important}
.btn-primary{background:var(--primary)!important;color:var(--primary-foreground)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{box-shadow:var(--shadow-lg)!important;background:var(--primary-hover)!important}
.btn-primary:active{box-shadow:var(--shadow-inner)!important}
input,textarea,select{border:none!important;background:var(--surface)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important;color:var(--text)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-inner)!important;border:none!important}
.badge,.tag,.chip{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-full)!important}
.alert{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.dropdown-menu,.modal-container,.toast{border:none!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
pre{border:none!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
code{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.file-upload{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.progress{box-shadow:var(--shadow-inner)!important;border:none!important;border-radius:var(--radius-full)!important}
.navbar{border:none!important;box-shadow:var(--shadow-sm)!important}
fieldset{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.accordion-item{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
`,

'bauhaus': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
body{font-family:var(--font-family);letter-spacing:0}
h1,h2,h3,h4,h5,h6{font-weight:900;letter-spacing:-.02em;text-transform:uppercase}
h1{font-size:var(--font-size-5xl);border-bottom:4px solid var(--text);padding-bottom:var(--space-2)}
h2{font-size:var(--font-size-3xl);border-left:6px solid var(--primary);padding-left:var(--space-3)}
.card{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;background:var(--surface)}
.card-bordered{border:2px solid var(--text)!important}
.card-title{font-weight:900;text-transform:uppercase;letter-spacing:-.02em}
.btn{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;font-weight:700;text-transform:uppercase;letter-spacing:.03em}
.btn:hover{background:var(--primary);color:var(--primary-foreground);border-color:var(--text)!important}
.btn:active{transform:translate(2px,2px)}
.btn-primary{background:var(--primary);color:var(--primary-foreground);border-color:var(--text)!important}
.btn-primary:hover{background:var(--primary-hover);border-color:var(--text)!important}
input,textarea,select{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;background:var(--surface)}
input:focus,textarea:focus,select:focus{box-shadow:none!important;border-color:var(--primary)!important;outline:2px solid var(--primary)}
.badge,.tag,.chip{border:2px solid var(--text)!important;border-radius:0!important;font-weight:700;text-transform:uppercase;box-shadow:none!important}
.alert{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.alert:hover{box-shadow:none!important;transform:none!important}
.alert-icon{border-radius:0!important}
.dropdown-menu,.modal-container,.toast{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
pre{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
code{border:1px solid var(--text)!important;border-radius:0!important}
.navbar{border-bottom:2px solid var(--text);box-shadow:none!important}
hr{border-top:2px solid var(--text)}
.file-upload{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.progress{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.accordion-item{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.accordion-trigger{border:none;border-radius:0!important}
.tab{border:2px solid transparent!important;border-radius:0!important}
.tab.active{border:2px solid var(--text)!important;border-bottom:none!important}
.pagination .page-link{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
.form-check-box{border-radius:0!important;border:2px solid var(--text)!important}
fieldset{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
`,

'organic': `
:root{--radius-sm:12px;--radius-md:20px;--radius-lg:32px;--radius-xl:48px;--shadow-xs:0 2px 6px rgba(0,0,0,.06);--shadow-sm:0 4px 12px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.3);--shadow-md:0 8px 20px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.3);--shadow-lg:0 12px 32px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.3);--shadow-xl:0 20px 48px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.3);--shadow-2xl:0 28px 64px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.3);--shadow-inner:inset 0 2px 6px rgba(0,0,0,.06)}
.card{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-md)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-sm)!important;font-weight:600}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translateY(-1px)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:none!important}
.btn-primary{box-shadow:var(--shadow-md)!important}
input,textarea,select{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-inner)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 3px color-mix(in oklch,var(--primary) 25%,transparent)!important;border:none!important}
.badge,.tag,.chip{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
.alert{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-sm)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:translateY(-1px)!important}
.alert-icon{border-radius:var(--radius-full)!important}
.dropdown-menu{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-lg)!important}
.modal-container{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-xl)!important}
.toast{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-lg)!important}
pre{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-sm)!important}
code{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
.file-upload{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-inner)!important}
.progress{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-inner)!important}
.navbar{border:none!important;border-radius:0 0 var(--radius-lg) var(--radius-lg)!important;box-shadow:var(--shadow-sm)!important}
fieldset{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-sm)!important}
.accordion-item{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-xs)!important;overflow:hidden}
.accordion-trigger{border:none!important}
.tab{border:none!important;border-radius:var(--radius-full)!important}
.tab.active{border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
.pagination .page-link{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
`,

'typographic': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 1px var(--primary)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
body{font-size:var(--font-size-md);letter-spacing:0;line-height:1.6}
h1{font-size:var(--font-size-5xl);font-weight:900;letter-spacing:-.04em;line-height:1;border-bottom:1px solid var(--border);padding-bottom:var(--space-3);margin-bottom:var(--space-5)}
h2{font-size:var(--font-size-4xl);font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-top:var(--space-6)}
h3{font-size:var(--font-size-2xl);font-weight:700;letter-spacing:-.02em}
h4{font-size:var(--font-size-xl);font-weight:700}
.card{border:none!important;border-radius:0!important;box-shadow:none!important;border-bottom:1px solid var(--border)!important;padding:var(--space-5) 0!important;background:transparent!important}
.card-bordered{border:none!important;border-bottom:1px solid var(--border)!important}
.card-header,.card-body,.card-actions{padding:0!important}
.card-title{font-weight:800;letter-spacing:-.02em}
.card-content{color:var(--text-muted);line-height:1.6}
.btn{border:none!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;font-weight:700;text-decoration:underline;text-underline-offset:3px;padding:0 var(--space-1)!important}
.btn:hover{background:transparent!important;text-decoration:underline;color:var(--primary-hover)!important}
.btn:active{transform:none!important}
.btn-primary{background:transparent!important;color:var(--primary)!important;text-decoration:underline}
.btn-primary:hover{background:transparent!important;color:var(--primary-hover)!important}
.btn-outline,.btn-ghost,.btn-secondary,.btn-contrast{background:transparent!important;text-decoration:underline}
.btn-success,.btn-warning,.btn-danger{background:transparent!important;text-decoration:underline}
.btn:disabled{text-decoration:line-through;opacity:.5}
input,textarea,select{border:none!important;border-bottom:1px solid var(--border)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding:var(--space-1) 0!important}
input:focus,textarea:focus,select:focus{box-shadow:none!important;border-bottom-color:var(--primary)!important}
.field-label{background:transparent!important}
.field-label::before{background:transparent!important}
.badge,.tag,.chip{border:none!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;font-weight:700;text-transform:uppercase;letter-spacing:.05em;font-size:var(--font-size-xs);padding:0!important;color:var(--text-muted)!important}
.badge::before,.chip::before{content:"["}.badge::after,.chip::after{content:"]"}
.alert{border:none!important;border-radius:0!important;box-shadow:none!important;border-left:3px solid var(--primary)!important;padding-left:var(--space-4)!important;background:transparent!important}
.alert:hover{box-shadow:none!important;transform:none!important}
.alert-icon{background:transparent!important}
.dropdown-menu,.modal-container,.toast{border:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
pre{border:none!important;border-left:2px solid var(--border)!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;padding-left:var(--space-4)!important}
code{background:transparent!important;border:none!important;border-radius:0!important;font-weight:600}
.navbar{border-bottom:1px solid var(--border);box-shadow:none!important;background:transparent!important}
.nav-brand{font-weight:900;letter-spacing:-.03em}
.nav-link{text-decoration:none;font-weight:600}
.nav-link.active{text-decoration:underline}
hr{border-top:1px solid var(--border)}
.file-upload{border:1px dashed var(--border)!important;border-radius:0!important;box-shadow:none!important;background:transparent!important}
.progress{border-radius:0!important;box-shadow:none!important;height:2px;background:var(--border)!important}
.progress-bar{background:var(--text)!important}
.accordion-item{border:none!important;border-bottom:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
.accordion-trigger{border:none!important;font-weight:700}
fieldset{border:none!important;border-radius:0!important;box-shadow:none!important;border-top:1px solid var(--border)!important;padding-top:var(--space-3)!important;background:transparent!important}
.tab{border:none!important;border-radius:0!important;box-shadow:none!important;font-weight:600}
.tab.active{border:none!important;border-bottom:1px solid var(--text)!important;background:transparent!important}
.pagination .page-link{border:none!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;font-weight:600}
.pagination .page-item.active .page-link{text-decoration:underline}
`,

'minimalism-mono': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 1px var(--text)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
[data-theme="light"] body{background:#fafafa;color:#1a1a1a}
[data-theme="dark"] body{background:#0a0a0a;color:#e8e8e8}
[data-theme="light"]{--border:#e0e0e0;--border-subtle:#f0f0f0;--border-strong:#ccc;--surface:#fff;--surface-elevated:#f5f5f5;--surface-hover:#f0f0f0;--surface-active:#eee;--text-muted:#999;--text-subtle:#bbb;--primary:#1a1a1a;--primary-foreground:#fafafa;--accent:#1a1a1a;--accent-foreground:#fafafa}
[data-theme="dark"]{--border:#222;--border-subtle:#1a1a1a;--border-strong:#333;--surface:#111;--surface-elevated:#181818;--surface-hover:#1a1a1a;--surface-active:#222;--text-muted:#888;--text-subtle:#555;--primary:#e8e8e8;--primary-foreground:#0a0a0a;--accent:#e8e8e8;--accent-foreground:#0a0a0a}
.card{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important;background:var(--surface)!important}
.card-bordered{border:1px solid var(--border)!important}
.card-title{font-weight:600}
.btn{border:1px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;font-weight:500;background:transparent!important;color:var(--text)!important}
.btn:hover{background:var(--text)!important;color:var(--background)!important}
.btn-primary{background:var(--text)!important;color:var(--background)!important;border-color:var(--text)!important}
.btn-primary:hover{background:var(--background)!important;color:var(--text)!important}
input,textarea,select{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important;background:transparent!important}
input:focus,textarea:focus,select:focus{box-shadow:none!important;border-color:var(--text)!important}
.badge,.tag,.chip{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important;font-weight:500}
.alert{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
.alert:hover{box-shadow:none!important;transform:none!important}
.alert-icon{border-radius:0!important}
.dropdown-menu,.modal-container,.toast{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
pre{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
code{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
.navbar{border-bottom:1px solid var(--border);box-shadow:none!important;background:transparent!important}
hr{border-top:1px solid var(--border)}
.file-upload{border:1px dashed var(--border)!important;box-shadow:none!important;border-radius:0!important}
.progress{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
.accordion-item{border:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
fieldset{border:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
.tab{border:none!important;border-radius:0!important;box-shadow:none!important;border-bottom:1px solid transparent!important}
.tab.active{border-bottom:1px solid var(--text)!important}
a{text-decoration:underline;text-underline-offset:2px}
a:hover{text-decoration:none}
`,

'papercut': `
:root{--radius-sm:0;--radius-md:2px;--radius-lg:4px;--shadow-xs:1px 1px 0 var(--border-strong),2px 2px 3px rgba(0,0,0,.06);--shadow-sm:2px 2px 0 var(--border-strong),4px 4px 6px rgba(0,0,0,.08);--shadow-md:3px 3px 0 var(--border-strong),6px 6px 8px rgba(0,0,0,.1);--shadow-lg:4px 4px 0 var(--border-strong),8px 8px 12px rgba(0,0,0,.12);--shadow-xl:5px 5px 0 var(--border-strong),10px 10px 16px rgba(0,0,0,.14);--shadow-2xl:6px 6px 0 var(--border-strong),12px 12px 20px rgba(0,0,0,.16);--shadow-inner:inset 0 0 0 1px var(--border-subtle),inset 1px 1px 2px rgba(0,0,0,.04);--shadow-focus:0 0 0 2px var(--primary)}
[data-theme="dark"]{--shadow-xs:1px 1px 0 var(--border-strong),2px 2px 3px rgba(0,0,0,.3);--shadow-sm:2px 2px 0 var(--border-strong),4px 4px 6px rgba(0,0,0,.3);--shadow-md:3px 3px 0 var(--border-strong),6px 6px 8px rgba(0,0,0,.35);--shadow-lg:4px 4px 0 var(--border-strong),8px 8px 12px rgba(0,0,0,.4);--shadow-xl:5px 5px 0 var(--border-strong),10px 10px 16px rgba(0,0,0,.45);--shadow-2xl:6px 6px 0 var(--border-strong),12px 12px 20px rgba(0,0,0,.5)}
.card{border:1px solid var(--border)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-md)!important;background:var(--surface)!important;position:relative}
.card::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--surface-elevated);border:1px solid var(--border);border-radius:var(--radius-md);transform:translate(3px,3px)}
.card:hover{box-shadow:var(--shadow-lg)!important;transform:translate(-1px,-1px)}
.card-bordered{border:1px solid var(--border)!important}
.card-title{font-weight:700}
.btn{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important;background:var(--surface)!important}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.btn:active{box-shadow:var(--shadow-xs)!important;transform:translate(1px,1px)}
.btn-primary{background:var(--primary)!important;color:var(--primary-foreground)!important}
.btn-primary:hover{background:var(--primary-hover)!important;box-shadow:var(--shadow-md)!important}
input,textarea,select{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-xs)!important}
.badge,.tag,.chip{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
.alert{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.alert-icon{border-radius:var(--radius-sm)!important}
.dropdown-menu,.modal-container,.toast{border:1px solid var(--border)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-md)!important}
pre{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
code{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.navbar{border-bottom:1px solid var(--border);box-shadow:var(--shadow-xs)!important}
.file-upload{border:1px dashed var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.progress{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.accordion-item{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important;margin-bottom:var(--space-2);overflow:hidden}
.accordion-trigger{border-radius:0!important}
fieldset{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
`,

'skeuomorphism-classic': `
:root{--radius-sm:4px;--radius-md:8px;--radius-lg:12px;--shadow-xs:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.12);--shadow-sm:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.15);--shadow-md:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -2px 0 rgba(0,0,0,.12),0 4px 8px rgba(0,0,0,.18);--shadow-lg:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -2px 0 rgba(0,0,0,.14),0 8px 16px rgba(0,0,0,.2);--shadow-xl:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -3px 0 rgba(0,0,0,.16),0 12px 24px rgba(0,0,0,.24);--shadow-2xl:inset 0 1px 0 rgba(255,255,255,.5),inset 0 -3px 0 rgba(0,0,0,.18),0 20px 40px rgba(0,0,0,.28);--shadow-inner:inset 0 2px 4px rgba(0,0,0,.2),inset 0 -1px 0 rgba(255,255,255,.15)}
[data-theme="dark"]{--shadow-xs:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.3);--shadow-sm:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -1px 0 rgba(0,0,0,.35),0 2px 4px rgba(0,0,0,.35);--shadow-md:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -2px 0 rgba(0,0,0,.4),0 4px 8px rgba(0,0,0,.4);--shadow-lg:inset 0 1px 0 rgba(255,255,255,.15),inset 0 -2px 0 rgba(0,0,0,.45),0 8px 16px rgba(0,0,0,.45);--shadow-xl:inset 0 1px 0 rgba(255,255,255,.15),inset 0 -3px 0 rgba(0,0,0,.5),0 12px 24px rgba(0,0,0,.5);--shadow-2xl:inset 0 1px 0 rgba(255,255,255,.18),inset 0 -3px 0 rgba(0,0,0,.55),0 20px 40px rgba(0,0,0,.55);--shadow-inner:inset 0 3px 6px rgba(0,0,0,.4),inset 0 -1px 0 rgba(255,255,255,.05)}
.card{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border-strong)!important}
.btn{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 92%,white) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:translateY(1px)!important}
.btn-primary{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;border-color:var(--primary)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{background:linear-gradient(180deg,color-mix(in srgb,var(--primary-hover) 88%,white) 0%,var(--primary-hover) 100%)!important}
.btn-primary:active{background:linear-gradient(180deg,var(--primary) 0%,color-mix(in srgb,var(--primary) 85%,white) 100%)!important;box-shadow:var(--shadow-inner)!important}
input,textarea,select{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 2px var(--primary)!important;border-color:var(--primary)!important}
.badge,.chip{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.navbar{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border-bottom:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important}
pre{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
code{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.15)!important;border-radius:var(--radius-sm)!important}
.progress{box-shadow:var(--shadow-inner)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-sm)!important}
.progress-bar{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 80%,white) 0%,var(--primary) 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.1)!important}
.file-upload{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.dropdown-menu,.modal-container,.toast{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
fieldset{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.accordion-item{border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
.spinner{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 1px 3px rgba(0,0,0,.15)!important}
input[type="range"]::-webkit-slider-thumb{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 1px 3px rgba(0,0,0,.15)!important;border:1px solid var(--border-strong)!important}
.form-check-box{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.12)!important;border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border-radius:var(--radius-sm)!important}
.form-check input:checked+.form-check-box{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;border-color:var(--primary)!important}
`,
};

export function styleCSS(styleId) {
  return STYLE_CSS[styleId] || '';
}