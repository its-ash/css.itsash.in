export const COMPONENTS = `
*,*::before,*::after{box-sizing:border-box}
html{font-size:16px;-webkit-text-size-adjust:100%}
body{margin:0;background:#fefefe;color:var(--text);font-family:var(--font-family);font-size:var(--font-size-md);line-height:var(--line-height-normal);letter-spacing:var(--letter-spacing-normal);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;transition:background .25s ease,color .25s ease}
a{color:var(--primary);text-decoration:none;transition:color .15s ease}
a:hover{color:var(--primary-hover);text-decoration:underline;text-underline-offset:2px}
a:focus-visible{outline:2px solid var(--primary);outline-offset:2px;border-radius:var(--radius-sm)}
p{margin:0 0 var(--space-4)}
p:last-child{margin-bottom:0}
small{font-size:var(--font-size-sm);color:var(--text-muted)}
strong{font-weight:var(--font-weight-semibold)}
em{font-style:italic}
h1,h2,h3,h4,h5,h6{font-family:var(--font-family-heading);font-weight:var(--font-weight-bold);letter-spacing:var(--letter-spacing-tight);line-height:var(--line-height-tight);text-wrap:balance}
h1{font-size:var(--font-size-4xl);margin:0 0 var(--space-5)}
h2{font-size:var(--font-size-3xl);margin:0 0 var(--space-5)}
h3{font-size:var(--font-size-2xl);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-4)}
h4{font-size:var(--font-size-xl);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-3)}
h5{font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-2)}
h6{font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--text-muted);margin:0 0 var(--space-2);letter-spacing:var(--letter-spacing-wide);text-transform:uppercase}
hr{border:none;border-top:1px solid var(--border-subtle);margin:var(--space-6) 0}
blockquote{margin:0 0 var(--space-4);padding:var(--space-4) var(--space-6);border-left:3px solid var(--primary);background:var(--surface);border-radius:0 var(--radius-lg) var(--radius-lg) 0;color:var(--text-muted);font-style:italic}
blockquote p{margin:0}
code{font-family:var(--font-family-mono);font-size:0.85em;background:var(--surface-active);padding:0.15em 0.4em;border-radius:var(--radius-sm);color:var(--accent);font-weight:500}
pre{font-family:var(--font-family-mono);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-4);overflow-x:auto;margin:0 0 var(--space-4);line-height:var(--line-height-normal);box-shadow:var(--shadow-sm)}
pre code{background:none;padding:0;color:var(--text);font-size:var(--font-size-sm);font-weight:400}
mark{background:color-mix(in srgb,var(--warning) 25%,transparent);color:var(--text);padding:0.1em 0.35em;border-radius:var(--radius-sm);font-weight:500}
kbd{background:var(--surface-elevated);border:1px solid transparent;border-bottom-width:2px;border-radius:var(--radius-sm);padding:0.15em 0.4em;font-family:var(--font-family-mono);font-size:0.85em;color:var(--text);box-shadow:var(--shadow-xs)}
q{font-style:italic;color:var(--text-muted)}
cite{font-style:italic;color:var(--text-muted);font-size:var(--font-size-sm)}
::selection{background:var(--primary);color:var(--primary-foreground)}
[data-theme="dark"] ::selection{background:color-mix(in srgb,var(--primary) 60%,transparent);color:var(--primary-foreground)}
ul li::marker{color:var(--accent)}
ol li::marker{color:var(--primary);font-weight:var(--font-weight-bold)}
figure{margin:0 0 var(--space-4);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
figcaption{padding:var(--space-3);font-size:var(--font-size-sm);color:var(--text-muted);text-align:center;background:var(--surface)}
img{max-width:100%;height:auto;border-radius:var(--radius-md)}
input,textarea,select,button{font:inherit;color:inherit}
label{display:inline-block;margin-bottom:var(--space-2);font-weight:var(--font-weight-medium);font-size:var(--font-size-sm);color:var(--text)}
input[type="text"],input[type="email"],input[type="password"],input[type="number"],input[type="search"],input[type="url"],input[type="tel"],input[type="date"],textarea,select{display:block;width:100%;padding:0.625rem var(--space-3);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text);font-size:var(--font-size-sm);line-height:1.4;box-shadow:var(--shadow-xs);transition:border-color .18s ease,box-shadow .18s ease,background .18s ease}
input::placeholder,textarea::placeholder{color:var(--text-subtle);opacity:0;transition:opacity .15s ease}
input:focus::placeholder,textarea:focus::placeholder{opacity:1}
.field input:not(:placeholder-shown)::placeholder,.field textarea:not(:placeholder-shown)::placeholder{opacity:0}
input:hover,textarea:hover,select:hover{box-shadow:var(--shadow-sm)}
input:focus,textarea:focus,select:focus{border-color:var(--primary);outline:none;box-shadow:var(--shadow-focus),var(--shadow-sm)}
input:focus-visible,textarea:focus-visible,select:focus-visible{border-color:var(--primary)}
input:disabled,textarea:disabled,select:disabled{opacity:.5;cursor:not-allowed;background:var(--surface-active)}
input:invalid{border-color:var(--error)}
input:required{box-shadow:none}
.field{position:relative;display:flex;flex-direction:column;align-items:stretch;flex-wrap:nowrap;gap:0;width:100%;margin-bottom:var(--space-3);border-radius:var(--radius-md);transition:background .18s ease,box-shadow .18s ease}
.field-label{position:absolute;left:var(--space-3);top:50%;transform:translateY(-50%);color:var(--text-subtle);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);pointer-events:none;transition:all .18s ease;background:transparent;padding:0 var(--space-1);z-index:1}
.field-label::before{content:"";position:absolute;inset:0;background:var(--surface);z-index:-1;border-radius:var(--radius-sm)}
textarea~.field-label{top:var(--space-3);transform:none}
.field input:focus~.field-label,.field input:not(:placeholder-shown)~.field-label,.field textarea:focus~.field-label,.field textarea:not(:placeholder-shown)~.field-label,.field select~.field-label{top:0;transform:translateY(-50%) scale(.85);left:var(--space-2);color:var(--primary);font-weight:var(--font-weight-semibold)}
.field:has(select) .field-label{top:0;transform:translateY(-50%) scale(.85);left:var(--space-2);color:var(--text-subtle);font-weight:var(--font-weight-semibold)}
.field:has(select:focus) .field-label{color:var(--primary)}
.field input:focus~.field-label,.field textarea:focus~.field-label{color:var(--primary)}
.field input,.field textarea,.field select{border-color:transparent}
.field input::placeholder,.field textarea::placeholder{color:var(--text-subtle)}
.field-error{display:none;position:absolute;left:0;bottom:calc(-1.25rem);font-size:var(--font-size-xs);color:var(--error);font-weight:var(--font-weight-medium);padding:0 var(--space-2);pointer-events:none}
.field:has(input:user-invalid),.field:has(textarea:user-invalid),.field:has(select:user-invalid){background:transparent}
.field:has(input:user-invalid) input,.field:has(textarea:user-invalid) textarea,.field:has(select:user-invalid) select{border-color:var(--error)}
.field:has(input:user-invalid) .field-label,.field:has(textarea:user-invalid) .field-label,.field:has(select:user-invalid) .field-label{color:var(--error)}
.field:has(input:user-invalid) .field-error,.field:has(textarea:user-invalid) .field-error,.field:has(select:user-invalid) .field-error{display:flex;align-items:center;gap:var(--space-1)}
.field:has(input:user-valid),.field:has(textarea:user-valid),.field:has(select:user-valid){background:transparent}
.field:has(input:user-valid) input,.field:has(textarea:user-valid) textarea,.field:has(select:user-valid) select{border-color:var(--success)}
.field:has(input:user-valid) .field-label,.field:has(textarea:user-valid) .field-label,.field:has(select:user-valid) .field-label{color:var(--success)}
.field:has(input:focus) .field-label::before,.field:has(input:not(:placeholder-shown)) .field-label::before,.field:has(textarea:focus) .field-label::before,.field:has(textarea:not(:placeholder-shown)) .field-label::before{background:var(--surface)}
input:user-invalid,textarea:user-invalid,select:user-invalid{border-color:var(--error);box-shadow:0 0 0 3px color-mix(in srgb,var(--error) 20%,transparent),var(--shadow-sm)}
input:user-valid,textarea:user-valid,select:user-valid{border-color:var(--success)}
label:has(+ input[required])::after,label:has(+ textarea[required])::after,label:has(+ select[required])::after{content:" *";color:var(--error);font-weight:var(--font-weight-semibold)}
.field:has(input:focus) label,.field:has(textarea:focus) label,.field:has(select:focus) label{color:var(--primary)}
.field:has(input:user-invalid) label{color:var(--error)}
.form-group:has(input:disabled){opacity:.6}
.form-group:has(input[readonly]) input{background:var(--surface-active)}
input:indeterminate{accent-color:var(--accent)}
textarea{min-height:6rem;resize:vertical;padding-top:0.625rem}
select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right var(--space-3) center;padding-right:var(--space-8)}
optgroup{background:var(--surface);color:var(--text-muted);font-weight:var(--font-weight-semibold)}
option{background:var(--surface);color:var(--text);padding:var(--space-1) var(--space-2)}
option:checked{background:var(--primary);color:var(--primary-foreground)}
fieldset{border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-4) var(--space-5);margin:0 0 var(--space-4);background:var(--surface);box-shadow:var(--shadow-xs)}
legend{font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);font-size:var(--font-size-sm);color:var(--text);padding:0 var(--space-2);letter-spacing:var(--letter-spacing-tight)}
input[type="checkbox"],input[type="radio"]{position:absolute;opacity:0;width:0;height:0;margin:0}
.form-check{display:inline-flex;align-items:center;gap:var(--space-2);cursor:pointer;font-size:var(--font-size-sm);color:var(--text);user-select:none}
.form-check input[type="checkbox"],.form-check input[type="radio"]{position:absolute;opacity:0;width:0;height:0}
.form-check-box{display:inline-flex;align-items:center;justify-content:center;width:1.25rem;height:1.25rem;border:2px solid var(--border-strong);border-radius:var(--radius-sm);background:var(--surface);flex-shrink:0;transition:background .18s ease,border-color .18s ease,box-shadow .18s ease;box-shadow:var(--shadow-xs)}
.form-check:hover .form-check-box{border-color:var(--primary);box-shadow:var(--shadow-sm)}
.form-check input:focus-visible+.form-check-box{outline:2px solid var(--primary);outline-offset:2px}
.form-check input:checked+.form-check-box{background:var(--primary);border-color:var(--primary);box-shadow:0 2px 8px color-mix(in oklch,var(--primary) 30%,transparent)}
.form-check input:checked+.form-check-box::after{content:"";display:block;width:0.4rem;height:0.7rem;border:solid var(--primary-foreground);border-width:0 2px 2px 0;transform:rotate(45deg) translate(-1px,-1px)}
.form-check input:disabled+.form-check-box{opacity:.4;cursor:not-allowed}
.form-check input:disabled~.form-check-label{opacity:.4;cursor:not-allowed}
.form-check-label{font-weight:var(--font-weight-medium)}
.form-radio .form-check-box{border-radius:var(--radius-full)}
.form-radio input:checked+.form-check-box::after{content:"";display:block;width:0.5rem;height:0.5rem;border-radius:var(--radius-full);background:var(--primary-foreground);border:none;transform:translate(0,0)}
input[type="range"]{width:100%;accent-color:var(--primary);cursor:pointer;height:1.5rem;outline:none;-webkit-appearance:none;appearance:none;background:transparent}
input[type="range"]::-webkit-slider-runnable-track{height:0.375rem;background:var(--surface-active);border-radius:var(--radius-full)}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:1rem;height:1rem;border-radius:var(--radius-full);background:var(--primary);margin-top:-0.3125rem;box-shadow:0 1px 4px color-mix(in oklch,var(--primary) 40%,transparent);cursor:pointer}
input[type="range"]::-moz-range-track{height:0.375rem;background:var(--surface-active);border-radius:var(--radius-full)}
input[type="range"]::-moz-range-thumb{width:1rem;height:1rem;border:none;border-radius:var(--radius-full);background:var(--primary);box-shadow:0 1px 4px color-mix(in oklch,var(--primary) 40%,transparent);cursor:pointer}
progress{width:100%;height:0.5rem;border:none;border-radius:var(--radius-full);overflow:hidden;accent-color:var(--primary);background:var(--surface-active)}
progress::-webkit-progress-bar{background:var(--surface-active);border-radius:var(--radius-full)}
progress::-webkit-progress-value{background:var(--primary);border-radius:var(--radius-full);transition:width .3s ease}
progress::-moz-progress-bar{background:var(--primary);border-radius:var(--radius-full)}
meter{width:100%;height:0.5rem;border:none;border-radius:var(--radius-full);overflow:hidden;accent-color:var(--accent);background:var(--surface-active)}
meter::-webkit-meter-bar{background:var(--surface-active);border-radius:var(--radius-full)}
meter::-webkit-meter-optimum-value{background:var(--success);border-radius:var(--radius-full)}
meter::-webkit-meter-suboptimum-value{background:var(--warning);border-radius:var(--radius-full)}
meter::-webkit-meter-even-less-good-value{background:var(--error);border-radius:var(--radius-full)}
output{display:inline-block;color:var(--primary);font-weight:var(--font-weight-semibold);font-family:var(--font-family-mono);font-size:var(--font-size-sm);padding:0 var(--space-1)}
input[type="file"]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
input[type="file"]::file-selector-button{background:var(--primary);color:var(--primary-foreground);border:0;padding:var(--space-1) var(--space-3);border-radius:var(--radius-md);font-size:var(--font-size-xs);font-weight:var(--font-weight-semibold);cursor:pointer;margin-right:var(--space-2);transition:background .18s ease}
input[type="file"]::file-selector-button:hover{background:var(--primary-hover)}
.file-upload{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-6);background:var(--surface);border:2px dashed var(--border-strong);border-radius:var(--radius-lg);color:var(--text-muted);font-size:var(--font-size-sm);text-align:center;cursor:pointer;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease;box-shadow:var(--shadow-xs)}
.file-upload:hover{border-color:var(--primary);background:var(--surface-hover);box-shadow:var(--shadow-sm)}
.file-upload:has(input[type="file"]:focus-visible){outline:2px solid var(--primary);outline-offset:2px}
.file-upload.dragover{border-color:var(--primary);background:var(--primary-soft);box-shadow:var(--shadow-md)}
.file-upload-icon{display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;border-radius:var(--radius-full);background:var(--primary-soft);color:var(--primary);flex-shrink:0;transition:background .18s ease,color .18s ease,transform .18s ease}
.file-upload:hover .file-upload-icon{background:var(--primary);color:var(--primary-foreground);transform:scale(1.05)}
.file-upload-icon svg{width:1.25rem;height:1.25rem}
.file-upload-text{font-weight:var(--font-weight-medium);color:var(--text)}
.file-upload-hint{font-size:var(--font-size-xs);color:var(--text-subtle)}
.file-upload-name{display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-1) var(--space-3);background:var(--surface-active);border-radius:var(--radius-full);font-size:var(--font-size-xs);color:var(--text);font-weight:var(--font-weight-medium);margin-top:var(--space-1)}
details{border:1px solid transparent;border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-xs);margin-bottom:var(--space-3);overflow:hidden;transition:border-color .18s ease,box-shadow .18s ease}
details:hover{box-shadow:var(--shadow-sm)}
details[open]{box-shadow:var(--shadow-sm),0 0 0 1px color-mix(in srgb,var(--primary) 30%,transparent)}
summary{display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) var(--space-4);font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);font-size:var(--font-size-sm);color:var(--text);cursor:pointer;list-style:none;letter-spacing:var(--letter-spacing-tight);user-select:none}
summary::-webkit-details-marker{display:none}
summary::after{content:"▾";color:var(--text-muted);font-size:var(--font-size-xs);transition:transform .2s ease}
details[open] summary{color:var(--primary);border-bottom:1px solid var(--border-subtle)}
details[open] summary::after{transform:rotate(180deg)}
details summary+*{padding:var(--space-4);color:var(--text-muted);font-size:var(--font-size-sm)}
dialog{background:var(--surface);color:var(--text);border:1px solid transparent;border-radius:var(--radius-xl);box-shadow:var(--shadow-2xl);padding:0;max-width:32rem;width:90vw;animation:scale-in .2s ease}
dialog::backdrop{background:color-mix(in srgb,var(--background) 65%,transparent);backdrop-filter:blur(6px)}
dialog[open]{display:flex;flex-direction:column}
.section:target{scroll-margin-top:5rem}
.card-body:empty,.alert:empty,.toast:empty{display:none}
.list-bordered .list-item{border-bottom:1px solid var(--border-subtle)}
.list-bordered .list-item:last-of-type{border-bottom:0}
.card-actions:only-child{justify-content:flex-end}
button{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);border:1px solid transparent;border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer;transition:background .18s ease,box-shadow .18s ease,opacity .18s ease,transform .1s ease;text-align:center;line-height:1.4}
button:hover{transform:translateY(-1px)}
button:active{transform:translateY(0)}
button:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
button:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);border:1px solid transparent;border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer;transition:background .18s ease,box-shadow .18s ease,transform .1s ease;white-space:nowrap;text-decoration:none;line-height:1.4}
.btn:hover{transform:translateY(-1px)}
.btn:active{transform:translateY(0)}
.btn:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-primary{background:var(--primary);color:var(--primary-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--primary) 28%,transparent),0 1px 1px color-mix(in oklch,var(--primary) 18%,transparent)}
.btn-primary:hover{background:var(--primary-hover);box-shadow:0 6px 16px color-mix(in oklch,var(--primary) 32%,transparent),0 3px 8px color-mix(in oklch,var(--primary) 20%,transparent),0 1px 2px color-mix(in oklch,var(--primary) 15%,transparent)}
.btn-primary:active{background:var(--primary-active)}
.btn-secondary{background:var(--neutral);color:var(--neutral-foreground)}
.btn-secondary:hover{background:var(--neutral-hover)}
.btn-secondary:active{background:var(--neutral-active)}
.btn-accent{background:var(--accent);color:var(--accent-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--accent) 28%,transparent),0 1px 1px color-mix(in oklch,var(--accent) 18%,transparent)}
.btn-accent:hover{background:var(--accent-hover);box-shadow:0 6px 16px color-mix(in oklch,var(--accent) 32%,transparent),0 3px 8px color-mix(in oklch,var(--accent) 20%,transparent),0 1px 2px color-mix(in oklch,var(--accent) 15%,transparent)}
.btn-accent:active{background:var(--accent-active)}
.btn-contrast{background:var(--contrast);color:var(--contrast-foreground)}
.btn-contrast:hover{background:var(--contrast-hover)}
.btn-contrast:active{background:var(--contrast-active)}
.btn-outline{background:transparent;color:var(--primary);border-color:var(--border);box-shadow:var(--shadow-xs)}
.btn-outline:hover{background:var(--primary-soft);color:var(--primary);border-color:var(--primary);box-shadow:var(--shadow-sm)}
.btn-outline:active{background:var(--primary-active)}
.btn-ghost{background:transparent;color:var(--text)}
.btn-ghost:hover{background:var(--surface-hover)}
.btn-ghost:active{background:var(--surface-active)}
.btn-danger{background:var(--error);color:var(--error-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--error) 28%,transparent),0 1px 1px color-mix(in oklch,var(--error) 18%,transparent)}
.btn-danger:hover{background:var(--error);filter:brightness(1.12);box-shadow:0 6px 16px color-mix(in oklch,var(--error) 32%,transparent),0 3px 8px color-mix(in oklch,var(--error) 20%,transparent),0 1px 2px color-mix(in oklch,var(--error) 15%,transparent)}
.btn-success{background:var(--success);color:var(--success-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--success) 28%,transparent),0 1px 1px color-mix(in oklch,var(--success) 18%,transparent)}
.btn-success:hover{background:var(--success);filter:brightness(1.12);box-shadow:0 6px 16px color-mix(in oklch,var(--success) 32%,transparent),0 3px 8px color-mix(in oklch,var(--success) 20%,transparent),0 1px 2px color-mix(in oklch,var(--success) 15%,transparent)}
.btn-warning{background:var(--warning);color:var(--warning-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--warning) 28%,transparent),0 1px 1px color-mix(in oklch,var(--warning) 18%,transparent)}
.btn-warning:hover{background:var(--warning);filter:brightness(1.12);box-shadow:0 6px 16px color-mix(in oklch,var(--warning) 32%,transparent),0 3px 8px color-mix(in oklch,var(--warning) 20%,transparent),0 1px 2px color-mix(in oklch,var(--warning) 15%,transparent)}
.btn-sm{padding:var(--space-1) var(--space-3);font-size:var(--font-size-xs);border-radius:var(--radius-sm)}
.btn-md{padding:var(--space-2) var(--space-4);font-size:var(--font-size-sm);border-radius:var(--radius-md)}
.btn-lg{padding:var(--space-3) var(--space-6);font-size:var(--font-size-lg);border-radius:var(--radius-lg)}
.btn[aria-busy="true"]{pointer-events:none;opacity:.7}
.btn[aria-busy="true"]::after{content:"";display:inline-block;width:0.85rem;height:0.85rem;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.card{background:#fefefe;border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-5);box-shadow:var(--shadow-sm);transition:box-shadow .25s ease,border-color .25s ease,transform .25s ease}
.card-bordered{border-color:var(--border)}
.card:hover{box-shadow:var(--shadow-lg);transform:translateY(-2px)}
.card-bordered:hover{border-color:var(--border-strong)}
.card-header{margin-bottom:var(--space-4);padding-bottom:var(--space-4);border-bottom:1px solid var(--border-subtle)}
.card-body{margin-bottom:var(--space-4)}
.card-footer{margin-top:var(--space-4);padding-top:var(--space-4);border-top:1px solid var(--border-subtle)}
.card-title{font-family:var(--font-family-heading);font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-1);color:var(--text);letter-spacing:var(--letter-spacing-tight)}
.card-subtitle{font-size:var(--font-size-sm);color:var(--text-muted);margin:0 0 var(--space-2)}
.card-content{color:var(--text-muted);font-size:var(--font-size-sm);line-height:var(--line-height-normal)}
.card-actions{display:flex;gap:var(--space-2);margin-top:var(--space-4)}
.nav,.navbar{display:flex;align-items:center;gap:var(--space-4);background:var(--surface);border-bottom:1px solid transparent;padding:var(--space-3) var(--space-6);backdrop-filter:saturate(1.2);box-shadow:var(--shadow-sm)}
.nav-header,.nav-brand{font-family:var(--font-family-heading);font-size:var(--font-size-lg);font-weight:var(--font-weight-bold);color:var(--text);letter-spacing:var(--letter-spacing-tight)}
.nav-menu{display:flex;align-items:center;gap:var(--space-1);margin:0;padding:0;list-style:none}
.nav-item{display:inline-flex}
.nav-link{padding:var(--space-2) var(--space-3);color:var(--text-muted);border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);text-decoration:none;transition:background .18s ease,color .18s ease}
.nav-link:hover{background:var(--surface-hover);color:var(--text)}
.nav-link.active{color:var(--primary);font-weight:var(--font-weight-semibold)}
.nav-link:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.nav-toggle{display:none;background:transparent;border:none;color:var(--text);font-size:var(--font-size-lg);cursor:pointer;padding:var(--space-2);border-radius:var(--radius-md)}
.nav-actions{margin-left:auto;display:flex;align-items:center;gap:var(--space-2)}
.sidebar{display:flex;flex-direction:column;gap:var(--space-1);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-3);box-shadow:var(--shadow-sm)}
.sidebar-header{padding:var(--space-3);font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);color:var(--text);letter-spacing:var(--letter-spacing-tight)}
.sidebar-menu{display:flex;flex-direction:column;gap:var(--space-1);margin:0;padding:0;list-style:none}
.sidebar-item{display:block}
.sidebar-link{display:block;padding:var(--space-2) var(--space-3);color:var(--text-muted);border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);text-decoration:none;transition:background .18s ease,color .18s ease}
.sidebar-link:hover{background:var(--surface-hover);color:var(--text)}
.sidebar-link.active{background:var(--primary-soft);color:var(--primary);font-weight:var(--font-weight-semibold)}
.sidebar-link:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
ul,ol{margin:0 0 var(--space-4);padding-left:var(--space-5)}
li{margin-bottom:var(--space-1)}
.list{display:flex;flex-direction:column;gap:var(--space-1);margin:0;padding:0;list-style:none}
.list-item{padding:var(--space-3);border-radius:var(--radius-md)}
.list-item-title{font-weight:var(--font-weight-medium);font-size:var(--font-size-sm);color:var(--text)}
.list-item-description{font-size:var(--font-size-sm);color:var(--text-muted)}
.list-bordered .list-item{border:1px solid var(--border-subtle)}
.list-hover .list-item:hover{background:var(--surface-hover)}
.list-compact .list-item{padding:var(--space-1) var(--space-2)}
table{width:100%;border-collapse:collapse;font-size:var(--font-size-sm)}
thead{border-bottom:1px solid var(--border-subtle)}
th{text-align:left;padding:var(--space-3);font-weight:var(--font-weight-semibold);color:var(--text)}
td{padding:var(--space-3);border-bottom:1px solid var(--border-subtle);color:var(--text)}
tbody tr:last-child td{border-bottom:0}
tbody tr:hover{background:var(--surface-hover)}
tfoot{border-top:1px solid var(--border-subtle)}
.table{width:100%;border-collapse:collapse}
.table th,.table td{padding:var(--space-3)}
.table-striped tbody tr:nth-child(odd){background:var(--surface)}
.table-hover tbody tr:hover{background:var(--surface-hover)}
.table-bordered th,.table-bordered td{border:1px solid var(--border)}
.badge{display:inline-flex;align-items:center;padding:0.2em 0.65em;font-size:var(--font-size-xs);font-weight:var(--font-weight-semibold);border-radius:var(--radius-full);line-height:1.5;box-shadow:0 1px 2px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.15)}
.badge-primary{background:var(--primary-soft);color:var(--primary)}
.badge-secondary{background:var(--neutral-soft);color:var(--neutral-foreground)}
.badge-accent{background:var(--accent-soft);color:var(--accent)}
.badge-success{background:var(--success-soft);color:var(--success)}
.badge-warning{background:var(--warning-soft);color:var(--warning)}
.badge-danger{background:var(--error-soft);color:var(--error)}
.badge-neutral{background:var(--neutral-muted);color:var(--neutral-foreground)}
.tag{display:inline-flex;align-items:center;gap:var(--space-1);padding:0.2em 0.7em;font-size:var(--font-size-xs);border-radius:var(--radius-md);border:1px solid transparent;background:var(--surface);color:var(--text);box-shadow:var(--shadow-xs)}
.tag-primary{border-color:var(--primary);color:var(--primary)}
.tag-accent{border-color:var(--accent);color:var(--accent)}
.alert{display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-radius:var(--radius-md);border:1px solid var(--border-subtle);margin-bottom:var(--space-3);background:var(--surface);box-shadow:var(--shadow-xs);position:relative;transition:box-shadow .18s ease,transform .18s ease,border-color .18s ease}
.alert:hover{box-shadow:var(--shadow-sm);transform:translateY(-1px)}
.alert-icon{display:flex;align-items:center;justify-content:center;width:1.75rem;height:1.75rem;border-radius:var(--radius-sm);flex-shrink:0;margin-top:1px;transition:transform .18s ease}
.alert:hover .alert-icon{transform:scale(1.08)}
.alert-icon svg{width:.9rem;height:.9rem}
.alert-body{flex:1;min-width:0}
.alert-title{font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-1);letter-spacing:var(--letter-spacing-tight);font-size:var(--font-size-sm);color:var(--text)}
.alert-message{margin:0;color:var(--text-muted);font-size:var(--font-size-sm);line-height:var(--line-height-normal)}
.alert-close{flex-shrink:0;background:transparent;border:none;color:var(--text-subtle);cursor:pointer;font-size:var(--font-size-lg);line-height:1;padding:var(--space-1);border-radius:var(--radius-sm);transition:background .15s ease,color .15s ease}
.alert-close:hover{background:var(--surface-hover);color:var(--text)}
.alert-primary{background:color-mix(in srgb,var(--primary) 8%,var(--surface));border-color:color-mix(in srgb,var(--primary) 20%,var(--border-subtle))}
.alert-primary .alert-icon{background:color-mix(in srgb,var(--primary) 15%,transparent);color:var(--primary)}
.alert-info{background:color-mix(in srgb,var(--info) 8%,var(--surface));border-color:color-mix(in srgb,var(--info) 20%,var(--border-subtle))}
.alert-info .alert-icon{background:color-mix(in srgb,var(--info) 15%,transparent);color:var(--info)}
.alert-success{background:color-mix(in srgb,var(--success) 8%,var(--surface));border-color:color-mix(in srgb,var(--success) 20%,var(--border-subtle))}
.alert-success .alert-icon{background:color-mix(in srgb,var(--success) 15%,transparent);color:var(--success)}
.alert-warning{background:color-mix(in srgb,var(--warning) 8%,var(--surface));border-color:color-mix(in srgb,var(--warning) 20%,var(--border-subtle))}
.alert-warning .alert-icon{background:color-mix(in srgb,var(--warning) 15%,transparent);color:var(--warning)}
.alert-danger{background:color-mix(in srgb,var(--error) 8%,var(--surface));border-color:color-mix(in srgb,var(--error) 20%,var(--border-subtle))}
.alert-danger .alert-icon{background:color-mix(in srgb,var(--error) 15%,transparent);color:var(--error)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:var(--space-4);z-index:1000;animation:fade-in .2s ease}
@keyframes fade-in{from{opacity:0}to{opacity:1}}
.modal-container{background:var(--surface);border:1px solid transparent;border-radius:var(--radius-xl);box-shadow:var(--shadow-2xl);max-width:32rem;width:100%;max-height:90vh;overflow-y:auto;animation:scale-in .2s ease}
@keyframes scale-in{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--border-subtle)}
.modal-title{margin:0;font-family:var(--font-family-heading);font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);letter-spacing:var(--letter-spacing-tight)}
.modal-close{background:transparent;border:none;color:var(--text-muted);font-size:var(--font-size-xl);line-height:1;cursor:pointer;padding:0 var(--space-1)}
.modal-close:hover{color:var(--text)}
.modal-body{padding:var(--space-5)}
.modal-footer{display:flex;justify-content:flex-end;gap:var(--space-2);padding:var(--space-4) var(--space-5);border-top:1px solid var(--border-subtle)}
.dropdown{position:relative;display:inline-block}
.dropdown-trigger{display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text);cursor:pointer;font-size:var(--font-size-sm);box-shadow:var(--shadow-xs);transition:box-shadow .18s ease}
.dropdown-trigger:hover{box-shadow:var(--shadow-sm)}
.dropdown-menu{position:absolute;top:100%;left:0;margin-top:var(--space-1);min-width:10rem;background:var(--surface-elevated);border:1px solid transparent;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);padding:var(--space-1);z-index:100;display:none;animation:scale-in .15s ease;transform-origin:top left}
.dropdown[data-open] .dropdown-menu{display:block}
.dropdown-item{display:block;width:100%;padding:var(--space-2) var(--space-3);color:var(--text);border:none;background:transparent;border-radius:var(--radius-sm);font-size:var(--font-size-sm);text-align:left;cursor:pointer}
.dropdown-item:hover{background:var(--surface-hover)}
.dropdown-item:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.dropdown-item.active{background:var(--primary-soft);color:var(--primary)}
.dropdown-item.disabled{opacity:.5;pointer-events:none}
.dropdown-divider{height:1px;background:var(--border-subtle);margin:var(--space-1) 0}
.tooltip{position:relative;display:inline-block}
.tooltip-content{position:absolute;bottom:calc(100% + var(--space-1));left:50%;transform:translateX(-50%);background:var(--contrast);color:var(--contrast-foreground);padding:var(--space-1) var(--space-2);border-radius:var(--radius-sm);font-size:var(--font-size-xs);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s;z-index:200}
.tooltip:hover .tooltip-content{opacity:1}
.tabs{border-bottom:1px solid var(--border-subtle)}
.tab-list{display:flex;gap:var(--space-1);margin:0;padding:0;list-style:none}
.tab{padding:var(--space-2) var(--space-4);color:var(--text-muted);border:none;background:transparent;border-bottom:2px solid transparent;border-radius:0;font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer;transition:color .18s ease,border-color .18s ease}
.tab:hover{color:var(--text)}
.tab.active{color:var(--primary);border-bottom-color:var(--primary);font-weight:var(--font-weight-semibold)}
.tab-panel{padding:var(--space-4) 0}
.pagination{display:flex;gap:var(--space-1);list-style:none;margin:0;padding:0}
.page-item{display:inline-block}
.page-link{display:inline-flex;align-items:center;justify-content:center;min-width:2rem;height:2rem;padding:0 var(--space-2);background:var(--surface);color:var(--text-muted);border:1px solid transparent;border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);text-decoration:none;box-shadow:var(--shadow-xs);transition:background .15s,box-shadow .15s,color .15s}
.page-link:hover{background:var(--surface-hover);color:var(--text);box-shadow:var(--shadow-sm)}
.page-item.active .page-link{background:var(--primary);color:var(--primary-foreground);box-shadow:0 2px 8px color-mix(in oklch,var(--primary) 30%,transparent)}
.page-item.disabled .page-link{opacity:.5;pointer-events:none}
.breadcrumb{display:flex;gap:var(--space-2);margin:0;padding:0;list-style:none;font-size:var(--font-size-sm)}
.breadcrumb-item{display:inline-flex;align-items:center;color:var(--text-muted)}
.breadcrumb-item a{color:var(--text-muted)}
.breadcrumb-item a:hover{color:var(--text)}
.breadcrumb-item.active{color:var(--text);font-weight:var(--font-weight-medium)}
.breadcrumb-separator{color:var(--text-subtle);margin:0 var(--space-1)}
.avatar{display:inline-flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:var(--radius-full);background:var(--primary-soft);color:var(--primary);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);overflow:hidden}
.avatar-sm{width:1.75rem;height:1.75rem;font-size:var(--font-size-xs)}
.avatar-md{width:2.5rem;height:2.5rem}
.avatar-lg{width:3.5rem;height:3.5rem;font-size:var(--font-size-lg)}
.avatar-group{display:inline-flex}
.avatar-group .avatar{margin-left:-0.5rem;border:2px solid var(--surface)}
.avatar-group .avatar:first-child{margin-left:0}
.progress{width:100%;height:0.5rem;background:var(--surface-active);border-radius:var(--radius-full);overflow:hidden;box-shadow:var(--shadow-inner)}
.progress-bar{height:100%;background:var(--primary);border-radius:var(--radius-full);transition:width .3s}
.spinner{display:inline-block;width:1.5rem;height:1.5rem;border:2px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}
.loader{display:inline-block;width:2rem;height:2rem;border:3px solid var(--surface-active);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}
.skeleton{display:block;background:linear-gradient(90deg,var(--surface-active) 25%,var(--surface-hover) 37%,var(--surface-active) 63%);background-size:400% 100%;animation:shimmer 1.4s ease infinite;border-radius:var(--radius-md)}
@keyframes shimmer{0%{background-position:100% 50%}100%{background-position:0 50%}}
.toast-container{position:fixed;top:var(--space-4);right:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2);z-index:1500}
.toast{display:flex;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:var(--surface-elevated);border:1px solid transparent;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);min-width:18rem}
.toast-header{display:flex;align-items:center;justify-content:space-between;font-weight:var(--font-weight-semibold);font-size:var(--font-size-sm)}
.toast-body{font-size:var(--font-size-sm);color:var(--text-muted)}
.toast-close{background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:var(--font-size-lg);line-height:1}
.toast-success{border-left:4px solid var(--success)}
.toast-warning{border-left:4px solid var(--warning)}
.toast-error{border-left:4px solid var(--error)}
.toast-info{border-left:4px solid var(--info)}
.accordion{border:1px solid transparent;border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
.accordion-item{border-bottom:1px solid var(--border-subtle)}
.accordion-item:last-child{border-bottom:none}
.accordion-header{margin:0}
.accordion-trigger{display:flex;width:100%;align-items:center;justify-content:space-between;padding:var(--space-4);background:transparent;border:none;color:var(--text);font-family:var(--font-family-heading);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);cursor:pointer;text-align:left;letter-spacing:var(--letter-spacing-tight);transition:background .18s ease}
.accordion-trigger:hover{background:var(--surface-hover)}
.accordion-content{padding:0 var(--space-4);max-height:0;overflow:hidden;transition:max-height .25s ease,padding .25s ease;color:var(--text-muted)}
.accordion-item[data-open="true"] .accordion-content{max-height:30rem;padding-bottom:var(--space-4)}
.accordion-item[data-open="true"] .accordion-trigger::after{transform:rotate(180deg)}
.accordion-trigger::after{content:"▾";transition:transform .25s;font-size:var(--font-size-sm);color:var(--text-muted)}
.chip{display:inline-flex;align-items:center;gap:var(--space-1);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);font-size:var(--font-size-xs);font-weight:var(--font-weight-semibold);background:var(--neutral-soft);color:var(--neutral-foreground);box-shadow:0 1px 2px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.10)}
.chip-primary{background:var(--primary-soft);color:var(--primary)}
.chip-accent{background:var(--accent-soft);color:var(--accent)}
.chip-success{background:var(--success-soft);color:var(--success)}
.chip-warning{background:var(--warning-soft);color:var(--warning)}
.chip-danger{background:var(--error-soft);color:var(--error)}
.chip-neutral{background:var(--neutral-muted);color:var(--neutral-foreground)}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-track{background:var(--surface);border-radius:var(--radius-full)}
::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--primary) 50%,var(--border-strong));border-radius:var(--radius-full);border:2px solid var(--surface);transition:background .15s ease}
::-webkit-scrollbar-thumb:hover{background:var(--primary)}
::-webkit-scrollbar-thumb:active{background:var(--primary-active)}
::-webkit-scrollbar-corner{background:var(--surface)}
*{scrollbar-width:thin;scrollbar-color:color-mix(in srgb,var(--primary) 50%,var(--border-strong)) var(--surface)}
[data-theme="dark"] ::-webkit-scrollbar-track{background:var(--surface)}
[data-theme="dark"] ::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--primary) 45%,var(--border-strong));border-color:var(--surface)}
[data-theme="dark"] ::-webkit-scrollbar-thumb:hover{background:var(--primary)}
[data-theme="dark"] *{scrollbar-color:color-mix(in srgb,var(--primary) 45%,var(--border-strong)) var(--surface)}
[title]{position:relative}
[title]::after{content:attr(title);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:var(--contrast);color:var(--contrast-foreground);padding:var(--space-1) var(--space-2);border-radius:var(--radius-sm);font-size:var(--font-size-xs);font-weight:var(--font-weight-medium);white-space:nowrap;pointer-events:none;opacity:0;z-index:999;box-shadow:var(--shadow-md);transition:opacity .15s ease,transform .15s ease}
[title]:hover::after{opacity:1;transform:translateX(-50%) translateY(-2px)}
[title]:focus-visible::after{opacity:1}
input[type="checkbox"]:indeterminate{accent-color:var(--accent)}
.form-control{display:block;width:100%;padding:var(--space-2) var(--space-3);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text);font-size:var(--font-size-sm);line-height:var(--line-height-normal);box-shadow:var(--shadow-xs);transition:border-color .18s ease,box-shadow .18s ease}
.form-control:focus{border-color:var(--primary);outline:none;box-shadow:var(--shadow-focus),var(--shadow-sm)}
.form-control:user-invalid{border-color:var(--error)}
.form-control:user-valid{border-color:var(--success)}
.form-group{display:flex;flex-direction:column;gap:var(--space-2);margin-bottom:var(--space-4)}
.form-group label{margin-bottom:0}
.form-row{display:flex;gap:var(--space-3);flex-wrap:wrap}
.form-row>.form-group{flex:1;min-width:12rem}
.input-group{display:flex;align-items:stretch;gap:0}
.input-group .form-control{border-radius:0}
.input-group .form-control:first-child{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}
.input-group .form-control:last-child{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}
.input-group-text{display:flex;align-items:center;padding:0 var(--space-3);background:var(--surface-active);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text-muted);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);white-space:nowrap}
.input-group-text:first-child{border-top-right-radius:0;border-bottom-right-radius:0}
.input-group-text:last-child{border-top-left-radius:0;border-bottom-left-radius:0}
[data-theme="dark"] progress::-webkit-progress-value{box-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .form-check input:checked+.form-check-box{box-shadow:0 0 0 0 color-mix(in srgb,var(--primary) 30%,transparent),0 4px 16px -4px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] details[open]{box-shadow:var(--shadow-sm),0 0 16px -4px color-mix(in srgb,var(--primary) 20%,transparent)}
[data-theme="dark"] dialog{box-shadow:var(--shadow-2xl),0 0 60px -10px color-mix(in srgb,var(--primary) 10%,transparent)}
[data-theme="dark"] .btn-primary{box-shadow:0 0 0 0 color-mix(in srgb,var(--primary) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-primary:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--primary) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-accent{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-accent:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--accent) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-danger{box-shadow:0 0 0 0 color-mix(in srgb,var(--error) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-danger:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--error) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-success{box-shadow:0 0 0 0 color-mix(in srgb,var(--success) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-success:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--success) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-warning{box-shadow:0 0 0 0 color-mix(in srgb,var(--warning) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-warning:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--warning) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-contrast{box-shadow:0 0 0 0 color-mix(in srgb,var(--contrast) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-contrast:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--contrast) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-outline:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--primary) 40%,transparent),var(--shadow-sm)}
[data-theme="dark"] input:focus,[data-theme="dark"] textarea:focus,[data-theme="dark"] select:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--primary) 25%,transparent),0 0 20px -4px color-mix(in srgb,var(--primary) 40%,transparent),var(--shadow-sm)}
[data-theme="dark"] .card{background:var(--surface)}
[data-theme="dark"] body{background:var(--background)}
[data-theme="dark"] .card:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--primary) 12%,transparent),var(--shadow-lg)}
[data-theme="dark"] .card-bordered:hover{border-color:var(--primary)}
[data-theme="dark"] .form-check input:checked+.form-check-box{box-shadow:0 0 0 0 color-mix(in srgb,var(--primary) 30%,transparent),0 4px 16px -4px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .badge{box-shadow:0 1px 2px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-primary{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--primary) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-accent{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--accent) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-success{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--success) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-danger{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--error) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .chip{box-shadow:0 1px 2px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.08)}
[data-theme="dark"] .alert{box-shadow:var(--shadow-xs)}
[data-theme="dark"] .alert:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--primary) 12%,transparent)}
[data-theme="dark"] .alert-success:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--success) 15%,transparent)}
[data-theme="dark"] .alert-danger:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--error) 15%,transparent)}
[data-theme="dark"] .alert-warning:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--warning) 15%,transparent)}
[data-theme="dark"] .alert-info:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--info) 15%,transparent)}
[data-theme="dark"] .alert-primary:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--primary) 15%,transparent)}
[data-theme="dark"] .nav-link.active{text-shadow:0 0 20px color-mix(in srgb,var(--primary) 40%,transparent)}
[data-theme="dark"] .progress-bar{box-shadow:0 0 12px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .page-item.active .page-link{box-shadow:0 4px 16px -4px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .file-upload:hover{box-shadow:var(--shadow-sm),0 0 20px -4px color-mix(in srgb,var(--primary) 30%,transparent)}
[data-theme="dark"] .file-upload.dragover{box-shadow:var(--shadow-md),0 0 24px -4px color-mix(in srgb,var(--primary) 45%,transparent)}
[data-theme="dark"] .modal-container{box-shadow:var(--shadow-2xl),0 0 60px -10px color-mix(in srgb,var(--primary) 10%,transparent)}
.container{width:100%;max-width:72rem;margin-inline:auto;padding-inline:var(--space-4)}
.container-sm{max-width:40rem}
.container-md{max-width:56rem}
.container-lg{max-width:72rem}
.container-xl{max-width:90rem}
.container-fluid{max-width:100%}
.row{display:flex;flex-wrap:wrap;gap:var(--space-3);margin-bottom:var(--space-3)}
.col{flex:1 1 0%;min-width:0}
.col-auto{flex:0 0 auto;width:auto}
.col-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}
.col-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}
.col-3{flex:0 0 25%;max-width:25%}
.col-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}
.col-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}
.col-6{flex:0 0 50%;max-width:50%}
.col-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}
.col-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}
.col-9{flex:0 0 75%;max-width:75%}
.col-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}
.col-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}
.col-12{flex:0 0 100%;max-width:100%}
@media(min-width:576px){.col-sm-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-sm-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-sm-3{flex:0 0 25%;max-width:25%}.col-sm-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-sm-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-sm-6{flex:0 0 50%;max-width:50%}.col-sm-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-sm-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-sm-9{flex:0 0 75%;max-width:75%}.col-sm-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-sm-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-sm-12{flex:0 0 100%;max-width:100%}}
@media(min-width:768px){.col-md-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-md-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-md-3{flex:0 0 25%;max-width:25%}.col-md-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-md-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-md-6{flex:0 0 50%;max-width:50%}.col-md-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-md-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-md-9{flex:0 0 75%;max-width:75%}.col-md-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-md-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-md-12{flex:0 0 100%;max-width:100%}}
@media(min-width:992px){.col-lg-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-lg-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-lg-3{flex:0 0 25%;max-width:25%}.col-lg-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-lg-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-lg-6{flex:0 0 50%;max-width:50%}.col-lg-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-lg-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-lg-9{flex:0 0 75%;max-width:75%}.col-lg-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-lg-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-lg-12{flex:0 0 100%;max-width:100%}}
@media(min-width:1200px){.col-xl-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-xl-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-xl-3{flex:0 0 25%;max-width:25%}.col-xl-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-xl-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-xl-6{flex:0 0 50%;max-width:50%}.col-xl-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-xl-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-xl-9{flex:0 0 75%;max-width:75%}.col-xl-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-xl-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-xl-12{flex:0 0 100%;max-width:100%}}
.flex{display:flex}
.inline-flex{display:inline-flex}
.flex-row{flex-direction:row}
.flex-col{flex-direction:column}
.flex-wrap{flex-wrap:wrap}
.flex-nowrap{flex-nowrap}
.flex-1{flex:1 1 0%}
.flex-auto{flex:1 1 auto}
.flex-none{flex:none}
.flex-grow{flex-grow:1}
.flex-shrink-0{flex-shrink:0}
.items-center{align-items:center}
.items-start{align-items:flex-start}
.items-end{align-items:flex-end}
.items-stretch{align-items:stretch}
.items-baseline{align-items:baseline}
.justify-center{justify-content:center}
.justify-start{justify-content:flex-start}
.justify-end{justify-content:flex-end}
.justify-between{justify-content:space-between}
.justify-around{justify-content:space-around}
.justify-evenly{justify-content:space-evenly}
.center{display:flex;align-items:center;justify-content:center}
.gap-1{gap:var(--space-1)}
.gap-2{gap:var(--space-2)}
.gap-3{gap:var(--space-3)}
.gap-4{gap:var(--space-4)}
.gap-6{gap:var(--space-6)}
.gap-8{gap:var(--space-8)}
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1,1fr)}
.grid-cols-2{grid-template-columns:repeat(2,1fr)}
.grid-cols-3{grid-template-columns:repeat(3,1fr)}
.grid-cols-4{grid-template-columns:repeat(4,1fr)}
.grid-cols-6{grid-template-columns:repeat(6,1fr)}
.grid-cols-12{grid-template-columns:repeat(12,1fr)}
@media(min-width:576px){.grid-sm-cols-2{grid-template-columns:repeat(2,1fr)}.grid-sm-cols-3{grid-template-columns:repeat(3,1fr)}.grid-sm-cols-4{grid-template-columns:repeat(4,1fr)}}
@media(min-width:768px){.grid-md-cols-2{grid-template-columns:repeat(2,1fr)}.grid-md-cols-3{grid-template-columns:repeat(3,1fr)}.grid-md-cols-4{grid-template-columns:repeat(4,1fr)}}
@media(min-width:992px){.grid-lg-cols-3{grid-template-columns:repeat(3,1fr)}.grid-lg-cols-4{grid-template-columns:repeat(4,1fr)}.grid-lg-cols-6{grid-template-columns:repeat(6,1fr)}}
.w-full{width:100%}
.w-auto{width:auto}
.w-screen{width:100vw}
.h-full{height:100%}
.h-auto{height:auto}
.h-screen{height:100vh}
.min-h-full{min-height:100%}
.min-h-screen{min-height:100vh}
.max-w-full{max-width:100%}
.max-w-sm{max-width:24rem}
.max-w-md{max-width:28rem}
.max-w-lg{max-width:32rem}
.max-w-xl{max-width:36rem}
.max-w-2xl{max-width:42rem}
.max-w-3xl{max-width:48rem}
.max-w-4xl{max-width:56rem}
.max-w-5xl{max-width:64rem}
.max-w-6xl{max-width:72rem}
.max-w-7xl{max-width:80rem}
.m-0{margin:0}.m-1{margin:var(--space-1)}.m-2{margin:var(--space-2)}.m-3{margin:var(--space-3)}.m-4{margin:var(--space-4)}.m-6{margin:var(--space-6)}.m-8{margin:var(--space-8)}.m-auto{margin:auto}
.mt-0{margin-top:0}.mt-1{margin-top:var(--space-1)}.mt-2{margin-top:var(--space-2)}.mt-3{margin-top:var(--space-3)}.mt-4{margin-top:var(--space-4)}.mt-6{margin-top:var(--space-6)}.mt-8{margin-top:var(--space-8)}
.mb-0{margin-bottom:0}.mb-1{margin-bottom:var(--space-1)}.mb-2{margin-bottom:var(--space-2)}.mb-3{margin-bottom:var(--space-3)}.mb-4{margin-bottom:var(--space-4)}.mb-6{margin-bottom:var(--space-6)}.mb-8{margin-bottom:var(--space-8)}
.ml-auto{margin-left:auto}.ml-0{margin-left:0}.ml-2{margin-left:var(--space-2)}.ml-4{margin-left:var(--space-4)}
.mr-auto{margin-right:auto}.mr-0{margin-right:0}.mr-2{margin-right:var(--space-2)}.mr-4{margin-right:var(--space-4)}
.mx-auto{margin-inline:auto}.mx-0{margin-inline:0}.mx-2{margin-inline:var(--space-2)}.mx-4{margin-inline:var(--space-4)}
.my-0{margin-block:0}.my-2{margin-block:var(--space-2)}.my-4{margin-block:var(--space-4)}.my-6{margin-block:var(--space-6)}.my-8{margin-block:var(--space-8)}
.p-0{padding:0}.p-1{padding:var(--space-1)}.p-2{padding:var(--space-2)}.p-3{padding:var(--space-3)}.p-4{padding:var(--space-4)}.p-6{padding:var(--space-6)}.p-8{padding:var(--space-8)}
.pt-0{padding-top:0}.pt-2{padding-top:var(--space-2)}.pt-4{padding-top:var(--space-4)}.pt-6{padding-top:var(--space-6)}
.pb-0{padding-bottom:0}.pb-2{padding-bottom:var(--space-2)}.pb-4{padding-bottom:var(--space-4)}.pb-6{padding-bottom:var(--space-6)}
.px-0{padding-inline:0}.px-2{padding-inline:var(--space-2)}.px-4{padding-inline:var(--space-4)}.px-6{padding-inline:var(--space-6)}
.py-0{padding-block:0}.py-2{padding-block:var(--space-2)}.py-4{padding-block:var(--space-4)}.py-6{padding-block:var(--space-6)}
.text-left{text-align:left}
.text-center{text-align:center}
.text-right{text-align:right}
.text-justify{text-align:justify}
.text-xs{font-size:var(--font-size-xs)}
.text-sm{font-size:var(--font-size-sm)}
.text-md{font-size:var(--font-size-md)}
.text-lg{font-size:var(--font-size-lg)}
.text-xl{font-size:var(--font-size-xl)}
.text-2xl{font-size:var(--font-size-2xl)}
.text-3xl{font-size:var(--font-size-3xl)}
.font-normal{font-weight:var(--font-weight-normal)}
.font-medium{font-weight:var(--font-weight-medium)}
.font-semibold{font-weight:var(--font-weight-semibold)}
.font-bold{font-weight:var(--font-weight-bold)}
.text-primary{color:var(--primary)}
.text-accent{color:var(--accent)}
.text-muted{color:var(--text-muted)}
.text-subtle{color:var(--text-subtle)}
.text-success{color:var(--success)}
.text-warning{color:var(--warning)}
.text-danger{color:var(--error)}
.text-info{color:var(--info)}
.text-foreground{color:var(--text)}
.bg-primary{background:var(--primary)}
.bg-accent{background:var(--accent)}
.bg-surface{background:var(--surface)}
.bg-surface-elevated{background:var(--surface-elevated)}
.bg-background{background:var(--background)}
.bg-primary-soft{background:var(--primary-soft)}
.bg-accent-soft{background:var(--accent-soft)}
.bg-success-soft{background:var(--success-soft)}
.bg-warning-soft{background:var(--warning-soft)}
.bg-error-soft{background:var(--error-soft)}
.rounded-sm{border-radius:var(--radius-sm)}
.rounded-md{border-radius:var(--radius-md)}
.rounded-lg{border-radius:var(--radius-lg)}
.rounded-xl{border-radius:var(--radius-xl)}
.rounded-full{border-radius:var(--radius-full)}
.rounded-none{border-radius:0}
.shadow-xs{box-shadow:var(--shadow-xs)}
.shadow-sm{box-shadow:var(--shadow-sm)}
.shadow-md{box-shadow:var(--shadow-md)}
.shadow-lg{box-shadow:var(--shadow-lg)}
.shadow-xl{box-shadow:var(--shadow-xl)}
.shadow-none{box-shadow:none}
.border{border:1px solid var(--border)}
.border-subtle{border:1px solid var(--border-subtle)}
.border-strong{border:1px solid var(--border-strong)}
.border-0{border:0}
.border-t{border-top:1px solid var(--border)}
.border-b{border-bottom:1px solid var(--border)}
.border-l{border-left:1px solid var(--border)}
.border-r{border-right:1px solid var(--border)}
.hidden{display:none}
.block{display:block}
.inline-block{display:inline-block}
.inline{display:inline}
.relative{position:relative}
.absolute{position:absolute}
.fixed{position:fixed}
.sticky{position:sticky}
.top-0{top:0}
.right-0{right:0}
.bottom-0{bottom:0}
.left-0{left:0}
.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.z-100{z-index:100}
.overflow-hidden{overflow:hidden}
.overflow-auto{overflow:auto}
.overflow-scroll{overflow:scroll}
.overflow-x-auto{overflow-x:auto}
.overflow-y-auto{overflow-y:auto}
.cursor-pointer{cursor:pointer}
.cursor-not-allowed{cursor:not-allowed}
.pointer-events-none{pointer-events:none}
.opacity-0{opacity:0}.opacity-50{opacity:.5}.opacity-75{opacity:.75}.opacity-100{opacity:1}
@media(max-width:480px){
  html{font-size:15px}
  body{font-size:var(--font-size-sm)}
  h1{font-size:var(--font-size-2xl)}
  h2{font-size:var(--font-size-xl)}
  h3{font-size:var(--font-size-lg)}
  .container{padding-inline:var(--space-3)}
  .nav,.navbar{padding:var(--space-2) var(--space-3);gap:var(--space-2)}
  .nav-brand{font-size:var(--font-size-md)}
  .nav-menu{display:none}
  .nav-toggle{display:inline-flex}
  .nav-actions{gap:var(--space-1)}
  .nav-actions .btn{padding:var(--space-1) var(--space-2);font-size:var(--font-size-xs)}
  .card{padding:var(--space-4)}
  .modal-container{max-width:calc(100vw - 2rem);margin:var(--space-2)}
  .modal-header,.modal-body,.modal-footer{padding:var(--space-3) var(--space-4)}
  .dropdown-menu{position:fixed;left:var(--space-2);right:var(--space-2);min-width:auto;max-width:calc(100vw - 1rem)}
  .alert{padding:var(--space-3);gap:var(--space-2);border-radius:var(--radius-sm)}
  .alert-icon{width:1.5rem;height:1.5rem;border-radius:var(--radius-sm)}
  .alert-icon svg{width:0.8rem;height:0.8rem}
  .toast{min-width:calc(100vw - 2rem)}
  .toast-container{left:var(--space-2);right:var(--space-2);top:var(--space-2)}
  .table{font-size:var(--font-size-xs)}
  .table th,.table td{padding:var(--space-2)}
  .pagination{gap:2px}
  .page-link{min-width:1.75rem;height:1.75rem}
  .btn{padding:var(--space-2) var(--space-3);font-size:var(--font-size-xs)}
  .btn-lg{padding:var(--space-2) var(--space-4);font-size:var(--font-size-sm)}
  .btn-sm{padding:var(--space-1) var(--space-2);font-size:var(--font-size-xs)}
  .row{gap:var(--space-2)}
  .grid{gap:var(--space-2)}
  details summary+*{padding:var(--space-3)}
  .file-upload{padding:var(--space-4);gap:var(--space-1)}
  .file-upload-icon{width:2.25rem;height:2.25rem}
  .file-upload-icon svg{width:1rem;height:1rem}
  .avatar-lg{width:2.75rem;height:2.75rem;font-size:var(--font-size-md)}
  fieldset{padding:var(--space-3) var(--space-4)}
}
@media(max-width:767px){
  .nav-menu{display:none}
  .nav-toggle{display:inline-flex}
  .nav-menu.open{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:var(--surface);padding:var(--space-2);gap:var(--space-1);box-shadow:var(--shadow-lg);z-index:50}
  .nav-menu.open .nav-item{display:block;width:100%}
  .nav-menu.open .nav-link{display:block;padding:var(--space-3);border-radius:var(--radius-md)}
  .sidebar{padding:var(--space-2)}
  .card-actions{flex-wrap:wrap}
  .form-row{flex-direction:column}
  .form-row>.form-group{flex:1 1 100%;min-width:0}
  .tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .tab-list{flex-wrap:nowrap;white-space:nowrap}
  .breadcrumb{flex-wrap:wrap;gap:var(--space-1)}
  .input-group{flex-wrap:wrap}
  .input-group .form-control{flex:1 1 100%;border-radius:var(--radius-md)!important}
  .input-group-text{flex:1 1 100%;border-radius:var(--radius-md)!important;justify-content:center}
  .modal-overlay{padding:var(--space-2)}
  .modal-container{max-width:calc(100vw - 1.5rem)}
  .accordion-trigger{padding:var(--space-3);font-size:var(--font-size-xs)}
  .accordion-item .accordion-content,.accordion-trigger+*{padding:var(--space-3)}
  .toast-container{left:var(--space-3);right:var(--space-3)}
  .toast{min-width:auto;width:100%}
  .alert{flex-wrap:wrap}
  .alert-close{margin-left:auto}
}
@media(min-width:481px) and (max-width:767px){
  .container{padding-inline:var(--space-4)}
  .nav,.navbar{padding:var(--space-3) var(--space-4)}
  .card{padding:var(--space-5)}
}
@media(min-width:768px) and (max-width:1023px){
  .nav-menu{gap:var(--space-1)}
  .nav-link{padding:var(--space-2) var(--space-3)}
  .nav-brand{font-size:var(--font-size-lg)}
  .card{padding:var(--space-5)}
  .container{padding-inline:var(--space-6)}
}
@media(min-width:1024px){
  .nav-toggle{display:none}
  .nav-menu{display:flex!important}
}
@media print{
  .nav,.navbar,.sidebar,.toast-container,.modal-overlay,.pagination,.file-upload{display:none!important}
  body{background:#fff!important;color:#000!important}
  .card{box-shadow:none;border:1px solid #ccc}
  .alert{box-shadow:none;border:1px solid #ccc}
  .btn{box-shadow:none}
  a{color:#000;text-decoration:underline}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
  .spinner,.loader{animation:none}
  .skeleton{animation:none;background:var(--surface-active)}
}
`;