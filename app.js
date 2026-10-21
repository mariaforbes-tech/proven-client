/* Portal del cliente de Proven Solutions.
   Aplicación aparte, a propósito: el navegador del cliente nunca descarga
   el código del portal del equipo. Lo que ve aquí es todo lo que hay. */
(function () {
  'use strict';
  var CFG = window.PORTAL_CONFIG || {};
  var sb = null;

  /* ---------- textos ---------- */
  var T = {
    es: {
      sign_in: 'Entrar', email: 'Correo', pass: 'Contraseña', sign_out: 'Salir',
      welcome: 'Tu proyecto', welcome_p: 'Mira cómo va tu obra, responde lo que falta por escoger y revisa tus pagos.',
      bad_login: 'Correo o contraseña incorrectos.',
      no_project: 'Todavía no hay un proyecto asignado a tu cuenta.',
      no_project_sub: 'Escríbele a Proven Solutions y lo activan.',
      loading: 'Cargando…', err: 'Algo falló al cargar. Recarga la página.',
      progress: 'Avance de la obra', done_of: '{d} de {t} etapas terminadas',
      now: 'Ahora mismo', next: 'Lo que sigue', finished: 'Obra terminada',
      ends: 'Entrega estimada', started: 'Inicio',
      ph_done: 'Terminado', ph_active: 'En proceso', ph_pending: 'Por empezar', ph_blocked: 'Detenido',
      stages: 'Las etapas', show_all: 'Ver todas las etapas', hide_all: 'Ocultar',
      sel_h: 'Lo que falta que escojas', sel_none: 'No hay nada pendiente por escoger',
      sel_g_due: 'PARA DECIDIR AHORA', sel_g_later: 'MÁS ADELANTE EN EL PROYECTO',
      sel_g_done: 'YA DECIDIDO', sel_soon: 'Más adelante',
      sel_none_sub: 'Cuando haya algo que decidir, aparece aquí.',
      sel_due: 'Fecha límite', sel_budget: 'Presupuestado', sel_choose: 'Escoger',
      sel_change: 'Cambiar', sel_your: 'Escogiste', sel_ordered: 'Ya pedido', sel_done: 'Escogido',
      sel_days: 'Quedan {n} días', sel_day1: 'Queda 1 día', sel_today: 'Es hoy',
      sel_late: 'Vencida hace {n} días', sel_late1: 'Vencida hace 1 día',
      sel_installs: 'Se instala el {d}',
      opt_upgrade: 'MEJORA',
      opt_pick: 'Escoger esta', opt_picked: 'Tu elección', opt_see: 'Ver',
      opt_none: 'Todavía no hay opciones cargadas', opt_none_sub: 'Proven las está armando. Si ya sabes qué quieres, propónla tú.',
      opt_mine: 'Propuesta tuya', opt_over: '{m} sobre el presupuesto', opt_under: '{m} por debajo',
      opt_own_h: '¿Ninguna te convence?', opt_own_b: 'Proponer la mía',
      opt_own_t: 'Qué quieres', opt_own_t_ph: 'Marca y modelo, o descríbelo',
      opt_own_l: 'Link (si tienes)', opt_own_l_ph: 'https://…',
      opt_own_f: 'Foto (si tienes)', opt_own_send: 'Mandársela a Proven',
      opt_own_note: 'Proven la revisa y te confirma el precio.',
      opt_sent: 'Enviada. Proven ya la ve.', opt_big: 'La foto pesa mucho. Prueba con otra.',
      sel_modal: '¿Qué escogiste?', sel_ph: 'Marca, color, modelo, acabado…',
      sel_help: 'Escribe con el mayor detalle que puedas. Si tienes el link o la referencia, pégala.',
      sel_saved: 'Guardado. Proven ya lo ve.',
      pay_h: 'Tus pagos', pay_paid: 'Pagado', pay_due: 'Pendiente', pay_next: 'Próximo pago',
      pay_on: 'Pagado el {d}', pay_by: 'Para el {d}', pay_none: 'Todavía no hay pagos registrados',
      upd_h: 'Avances', upd_none: 'Todavía no hay fotos ni novedades',
      upd_none_sub: 'Aquí van apareciendo las fotos de tu obra.',
      upd_write: 'Escribe un comentario…', upd_send: 'Enviar', upd_you: 'Tú',
      upd_team: 'Proven Solutions', save: 'Guardar', cancel: 'Cancelar', close: 'Cerrar',
    },
    en: {
      sign_in: 'Sign in', email: 'Email', pass: 'Password', sign_out: 'Sign out',
      welcome: 'Your project', welcome_p: 'See how your job is going, answer what still needs choosing, and check your payments.',
      bad_login: 'Wrong email or password.',
      no_project: 'No project is linked to your account yet.',
      no_project_sub: 'Message Proven Solutions and they will set it up.',
      loading: 'Loading…', err: 'Something failed to load. Please reload the page.',
      progress: 'Job progress', done_of: '{d} of {t} stages finished',
      now: 'Right now', next: 'Up next', finished: 'Job finished',
      ends: 'Estimated handover', started: 'Started',
      ph_done: 'Finished', ph_active: 'In progress', ph_pending: 'Not started', ph_blocked: 'On hold',
      stages: 'The stages', show_all: 'See all stages', hide_all: 'Hide',
      sel_h: 'What we need you to choose', sel_none: 'Nothing to choose right now',
      sel_g_due: 'DUE FOR SELECTION', sel_g_later: 'SELECT LATER IN PROJECT',
      sel_g_done: 'ALREADY DECIDED', sel_soon: 'Later',
      sel_none_sub: 'When there is something to decide, it shows up here.',
      sel_due: 'Deadline', sel_budget: 'Budgeted', sel_choose: 'Choose',
      sel_change: 'Change', sel_your: 'You chose', sel_ordered: 'Ordered', sel_done: 'Chosen',
      sel_days: '{n} days left', sel_day1: '1 day left', sel_today: 'Due today',
      sel_late: '{n} days overdue', sel_late1: '1 day overdue',
      sel_installs: 'Installs {d}',
      opt_upgrade: 'UPGRADE',
      opt_pick: 'Choose this', opt_picked: 'Your choice', opt_see: 'View',
      opt_none: 'No options loaded yet', opt_none_sub: 'Proven is putting them together. If you already know what you want, suggest it.',
      opt_mine: 'Your suggestion', opt_over: '{m} over budget', opt_under: '{m} under',
      opt_own_h: 'None of these work?', opt_own_b: 'Suggest my own',
      opt_own_t: 'What you want', opt_own_t_ph: 'Brand and model, or describe it',
      opt_own_l: 'Link (if you have one)', opt_own_l_ph: 'https://…',
      opt_own_f: 'Photo (if you have one)', opt_own_send: 'Send it to Proven',
      opt_own_note: 'Proven reviews it and confirms the price.',
      opt_sent: 'Sent. Proven can see it.', opt_big: 'That photo is too large. Try another.',
      sel_modal: 'What did you choose?', sel_ph: 'Brand, color, model, finish…',
      sel_help: 'Be as specific as you can. If you have a link or a reference, paste it.',
      sel_saved: 'Saved. Proven can see it now.',
      pay_h: 'Your payments', pay_paid: 'Paid', pay_due: 'Outstanding', pay_next: 'Next payment',
      pay_on: 'Paid {d}', pay_by: 'Due {d}', pay_none: 'No payments recorded yet',
      upd_h: 'Updates', upd_none: 'No photos or updates yet',
      upd_none_sub: 'Photos of your job will show up here.',
      upd_write: 'Write a comment…', upd_send: 'Send', upd_you: 'You',
      upd_team: 'Proven Solutions', save: 'Save', cancel: 'Cancel', close: 'Close',
    }
  };
  var lang = (localStorage.getItem('pc_lang') || (navigator.language || 'es').slice(0, 2));
  if (lang !== 'en') lang = 'es';
  function t(k, v) {
    var s = (T[lang] && T[lang][k]) || T.es[k] || k;
    if (v) Object.keys(v).forEach(function (n) { s = s.split('{' + n + '}').join(v[n]); });
    return s;
  }
  var loc = function () { return lang === 'en' ? 'en-US' : 'es-CO'; };

  /* ---------- utilidades de DOM ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag), late = [];
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'value' || k === 'checked' || k === 'disabled') late.push([k, v]);
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    late.forEach(function (p) { el[p[0]] = p[1]; });
    return el;
  }
  function add(el, k) {
    if (k == null || k === false) return;                       /* null NO se imprime */
    if (Array.isArray(k)) return k.forEach(function (x) { add(el, x); });
    el.appendChild(k.nodeType ? k : document.createTextNode(String(k)));
  }
  function fill(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    for (var i = 1; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  /* El contenido vive en español en la base. Si hay versión en inglés y el
     cliente está en inglés, se usa esa. Si no hay, se cae al español: mejor
     una palabra en español que un espacio en blanco. */
  function L(row, field) {
    if (lang === 'en') {
      var en = row[field + '_en'];
      if (en && String(en).trim()) return en;
    }
    return row[field];
  }

  /* La foto del celular pesa 4 MB. Se encoge antes de subirla: el cliente
     está en la calle con datos, no en una oficina. */
  function shrink(file, max, q) {
    if (!file || !/^image\//.test(file.type)) return Promise.resolve(file);
    return new Promise(function (ok) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var sc = Math.min(1, max / Math.max(img.width, img.height));
        if (sc >= 1) { URL.revokeObjectURL(url); return ok(file); }
        var c = document.createElement('canvas');
        c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(function (b) {
          URL.revokeObjectURL(url);
          ok(b ? new File([b], file.name, { type: 'image/jpeg' }) : file);
        }, 'image/jpeg', q);
      };
      img.onerror = function () { URL.revokeObjectURL(url); ok(file); };
      img.src = url;
    });
  }

  var app = function () { return document.getElementById('app'); };
  var money = function (n) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n) || 0); };
  function fDate(d, o) {
    try { return new Intl.DateTimeFormat(loc(), o || { month: 'long', day: 'numeric' }).format(new Date(d)); }
    catch (e) { return String(d); }
  }
  var dayOf = function (s) { return new Date(String(s) + 'T12:00:00'); };
  function daysTo(s) {
    var a = new Date(); a.setHours(0, 0, 0, 0);
    var b = dayOf(s); b.setHours(0, 0, 0, 0);
    return Math.round((b - a) / 864e5);
  }
  var spin = function () { return h('div', { class: 'spin', role: 'status', 'aria-label': t('loading') }); };
  function toast(msg, bad) {
    var e = h('div', { class: 'toast' + (bad ? ' bad' : ''), role: 'status' }, msg);
    document.body.appendChild(e);
    setTimeout(function () { e.classList.add('out'); setTimeout(function () { e.remove(); }, 400); }, 2600);
  }
  function ring(pct) {
    var s = 92, r = (s - 10) / 2, c = 2 * Math.PI * r;
    var e = h('span', { class: 'ring', 'aria-label': pct + '%' });
    e.innerHTML = '<svg viewBox="0 0 ' + s + ' ' + s + '" width="' + s + '" height="' + s + '">'
      + '<circle cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="7"/>'
      + '<circle cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke="#C9A84C" stroke-width="7" stroke-linecap="round"'
      + ' stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - pct / 100)).toFixed(1)
      + '" transform="rotate(-90 ' + s / 2 + ' ' + s / 2 + ')"/>'
      + '<text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-size="26" font-weight="800" fill="#fff">' + pct + '%</text></svg>';
    return e;
  }
  function langToggle() {
    function set(l) { lang = l; localStorage.setItem('pc_lang', l); start(); }
    return h('div', { class: 'lang' },
      h('button', { type: 'button', class: lang === 'es' ? 'on' : '', onclick: function () { set('es'); } }, 'ES'),
      h('button', { type: 'button', class: lang === 'en' ? 'on' : '', onclick: function () { set('en'); } }, 'EN'));
  }
  function modal(title, body) {
    var box = h('div', { class: 'mbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    var back = h('div', { class: 'mback', onclick: function (e) { if (e.target === back) close(); } },
      h('div', { class: 'mcard' },
        h('div', { class: 'mhead' }, h('b', null, title),
          h('button', { class: 'x', type: 'button', 'aria-label': t('close'), onclick: function () { close(); } }, '×')),
        fill(box, body)));
    function close() { back.remove(); document.removeEventListener('keydown', esc); }
    function esc(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', esc);
    document.body.appendChild(back);
    var f = back.querySelector('input,textarea,button');
    if (f) f.focus();
    return { close: close };
  }
  function busy(btn, on) {
    if (!btn) return;
    btn.disabled = !!on;
    btn.classList.toggle('busy', !!on);
  }

  /* ---------- entrada ---------- */
  function authScreen(msg) {
    var email = h('input', { type: 'email', required: true, autocomplete: 'username', placeholder: 'tu@correo.com' });
    var pass = h('input', { type: 'password', required: true, autocomplete: 'current-password' });
    var err = h('p', { class: 'err', role: 'alert' }, msg || '');
    var btn = h('button', { class: 'btn', type: 'submit' }, t('sign_in'));
    var form = h('form', { class: 'frm', onsubmit: function (e) {
      e.preventDefault(); fill(err); busy(btn, true);
      sb.auth.signInWithPassword({ email: email.value.trim(), password: pass.value })
        .then(function (r) {
          busy(btn, false);
          if (r.error) { fill(err, t('bad_login')); return; }
          start();
        })
        .catch(function () { busy(btn, false); fill(err, t('bad_login')); });
    } },
      h('label', { class: 'fld' }, h('span', null, t('email')), email),
      h('label', { class: 'fld' }, h('span', null, t('pass')), pass),
      err, btn);

    fill(app(), h('div', { class: 'auth' },
      h('div', { class: 'brand' },
        h('img', { src: 'logo-blanco.png', alt: 'Proven Solutions', class: 'logo' }),
        h('h1', null, t('welcome')),
        h('p', null, t('welcome_p'))),
      h('div', { class: 'acard' }, h('div', { class: 'atop' }, langToggle()), form)));
  }

  /* ---------- pantalla principal ---------- */
  function shell(project) {
    var main = h('main');
    fill(app(),
      h('header', { class: 'top' },
        h('div', { class: 'topin' },
          h('img', { src: 'logo-blanco.png', alt: 'Proven Solutions', class: 'tlogo' }),
          h('div', { class: 'tr' }, langToggle(),
            h('button', { class: 'lnk', type: 'button', onclick: function () {
              sb.auth.signOut().then(function () { start(); });
            } }, t('sign_out'))))),
      main);
    return main;
  }

  function phaseChip(st) {
    var cls = st === 'done' ? 'ok' : st === 'active' ? 'gold' : st === 'blocked' ? 'bad' : 'mut';
    return h('span', { class: 'chip ' + cls }, t('ph_' + st));
  }

  function dueLabel(due) {
    var n = daysTo(due);
    if (n < 0) return { txt: n === -1 ? t('sel_late1') : t('sel_late', { n: -n }), hot: true };
    if (n === 0) return { txt: t('sel_today'), hot: true };
    if (n === 1) return { txt: t('sel_day1'), hot: true };
    return { txt: t('sel_days', { n: n }), hot: n <= 7 };
  }

  /* --- avance --- */
  function heroCard(project, phases) {
    var once = phases.filter(function (s) { return (s.cadence || 'once') === 'once'; });
    var tot = once.reduce(function (a, x) { return a + Number(x.weight || 1); }, 0);
    var dn = once.filter(function (x) { return x.status === 'done'; })
                 .reduce(function (a, x) { return a + Number(x.weight || 1); }, 0);
    var pct = tot ? Math.round((dn / tot) * 100) : (project.pct_manual || 0);
    var doneN = once.filter(function (x) { return x.status === 'done'; }).length;

    var active = once.filter(function (x) { return x.status === 'active'; })[0];
    var next = once.filter(function (x) { return x.status !== 'done' && x.status !== 'active'; })[0];

    return h('section', { class: 'hero' },
      h('div', { class: 'hl' },
        h('h2', null, project.name),
        project.address ? h('p', { class: 'addr' }, project.address) : null,
        h('div', { class: 'hrow' },
          h('div', null, h('small', null, t('progress')), h('b', null, pct + '%')),
          once.length ? h('div', null, h('small', null, t('stages')),
            h('b', null, t('done_of', { d: doneN, t: once.length }))) : null,
          project.ends_on ? h('div', null, h('small', null, t('ends')),
            h('b', null, fDate(dayOf(project.ends_on)))) : null)),
      h('div', { class: 'hr' }, ring(pct)),
      h('div', { class: 'hnow' },
        active ? h('div', { class: 'nowit on' }, h('small', null, t('now')), h('b', null, L(active, 'title'))) : null,
        next ? h('div', { class: 'nowit' }, h('small', null, t('next')), h('b', null, L(next, 'title'))) : null,
        (!active && !next && once.length) ? h('div', { class: 'nowit on' }, h('b', null, t('finished'))) : null));
  }

  function stagesCard(phases) {
    var once = phases.filter(function (s) { return (s.cadence || 'once') === 'once'; })
                     .sort(function (a, b) { return (a.sort || 0) - (b.sort || 0); });
    if (!once.length) return null;
    var list = h('div', { class: 'stages', hidden: true },
      once.map(function (s) {
        return h('div', { class: 'stg' + (s.status === 'done' ? ' done' : '') },
          h('span', { class: 'dot' }), h('div', null, h('b', null, L(s, 'title')), phaseChip(s.status)));
      }));
    var open = false;
    var btn = h('button', { class: 'lnk wide', type: 'button', onclick: function () {
      open = !open; list.hidden = !open; btn.textContent = open ? t('hide_all') : t('show_all');
    } }, t('show_all'));
    return h('section', { class: 'card' }, btn, list);
  }

  /* --- selecciones --- */
  function selectionsCard(sels, opts, urls, reload) {
    /* Una selección está lista para decidir solo cuando ya tiene opciones cargadas.
       Sin opciones el cliente no puede escoger nada: eso no es un pendiente suyo,
       es un pendiente nuestro, y va en "más adelante" hasta que le subamos las opciones. */
    function hasOpts(s) { return (opts[s.id] || []).length > 0; }
    var dueNow = sels.filter(function (s) { return s.status === 'pending' && hasOpts(s); });
    var later  = sels.filter(function (s) { return s.status === 'pending' && !hasOpts(s); });
    var done   = sels.filter(function (s) { return s.status !== 'pending'; });

    /* El cliente ya no escribe a ciegas: ve las opciones con foto, link y precio.
       Si ninguna sirve, propone la suya y Proven le pone precio después. */
    function askFor(s) {
      var mine = (opts[s.id] || []).slice().sort(function (a, b) { return (a.sort || 0) - (b.sort || 0); });
      var box = h('div');

      function priceTag(o) {
        if (o.price == null) return null;
        var bits = [h('b', null, money(o.price))];
        if (s.allowance != null) {
          var d = Number(o.price) - Number(s.allowance);
          if (Math.abs(d) >= 1) {
            bits.push(h('span', { class: 'chip ' + (d > 0 ? 'bad' : 'ok') },
              d > 0 ? t('opt_over', { m: money(d) }) : t('opt_under', { m: money(-d) })));
          }
        }
        return h('div', { class: 'oprice' }, bits);
      }

      function card(o) {
        var picked = s.chosen_option_id === o.id;
        /* "extra" es el sobrecosto en palabras: '+$303 per door'. Va aparte del
           precio porque no es lo que cuesta la opción, es lo que cuesta DE MÁS,
           y confundir las dos cosas delante del cliente sale caro. */
        var up = !!(o.extra && String(o.extra).trim());
        return h('div', { class: 'opt' + (picked ? ' on' : '') + (up ? ' up' : '') },
          o.photo_path && urls[o.photo_path]
            ? h('img', { class: 'oph', src: urls[o.photo_path], alt: L(o, 'title'), loading: 'lazy' })
            : h('div', { class: 'oph none' }),
          h('div', { class: 'ob' },
            up ? h('span', { class: 'chip bad up' }, t('opt_upgrade')) : null,
            h('b', null, L(o, 'title')),
            o.from_client ? h('span', { class: 'chip gold' }, t('opt_mine')) : null,
            up ? h('div', { class: 'oextra' }, o.extra) : null,
            o.note ? h('small', null, o.note) : null,
            priceTag(o),
            h('div', { class: 'oact' },
              o.link ? h('a', { class: 'lnk', href: o.link, target: '_blank', rel: 'noopener noreferrer' }, t('opt_see')) : null,
              picked ? h('span', { class: 'chip ok' }, t('opt_picked'))
                : h('button', { class: 'btn sm', type: 'button', onclick: function (e) {
                    busy(e.currentTarget, true);
                    sb.rpc('client_pick_option', { p_option: o.id }).then(function (r) {
                      if (r.error) { busy(e.currentTarget, false); toast(r.error.message || t('err'), true); return; }
                      m.close(); toast(t('sel_saved')); reload();
                    });
                  } }, t('opt_pick')))));
      }

      /* --- proponer la suya --- */
      var ti = h('input', { required: true, placeholder: t('opt_own_t_ph') });
      var li = h('input', { type: 'url', placeholder: t('opt_own_l_ph') });
      var fi = h('input', { type: 'file', accept: 'image/*' });
      var send = h('button', { class: 'btn', type: 'submit' }, t('opt_own_send'));
      var own = h('form', { class: 'frm own', hidden: true, onsubmit: function (e) {
        e.preventDefault();
        var title = ti.value.trim();
        if (!title) return;
        busy(send, true);
        var file = fi.files && fi.files[0];
        var up = file ? shrink(file, 1400, 0.8).then(function (f) {
          if (f.size > 5 * 1024 * 1024) throw new Error(t('opt_big'));
          var path = s.project_id + '/client/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
          return sb.storage.from('project-files').upload(path, f, { contentType: f.type })
            .then(function (r) { if (r.error) throw r.error; return path; });
        }) : Promise.resolve('');
        up.then(function (path) {
          return sb.rpc('client_suggest_option', {
            p_sel: s.id, p_title: title, p_link: li.value.trim(), p_photo: path });
        }).then(function (r) {
          busy(send, false);
          if (r && r.error) { toast(r.error.message || t('err'), true); return; }
          m.close(); toast(t('opt_sent')); reload();
        }).catch(function (err) {
          busy(send, false); toast(err.message || t('err'), true);
        });
      } },
        h('label', { class: 'fld' }, h('span', null, t('opt_own_t')), ti),
        h('label', { class: 'fld' }, h('span', null, t('opt_own_l')), li),
        h('label', { class: 'fld' }, h('span', null, t('opt_own_f')), fi),
        h('p', { class: 'mut sm' }, t('opt_own_note')),
        send);

      var openOwn = h('button', { class: 'lnk wide', type: 'button', onclick: function () {
        own.hidden = !own.hidden;
        if (!own.hidden) ti.focus();
      } }, t('opt_own_b'));

      fill(box,
        s.allowance != null ? h('p', { class: 'mut sm bud' }, t('sel_budget') + ': ' + money(s.allowance)) : null,
        mine.length ? h('div', { class: 'opts' }, mine.map(card))
          : h('div', { class: 'empty' }, h('p', null, t('opt_none')), h('small', null, t('opt_none_sub'))),
        h('div', { class: 'ownbox' }, h('b', null, t('opt_own_h')), openOwn, own));

      var m = modal(L(s, 'title'), box);
    }

    function row(s, isLater) {
      var d = s.due_on ? dueLabel(s.due_on) : null;
      var bits = [L(s, 'room'),
        s.install_on ? t('sel_installs', { d: fDate(dayOf(s.install_on), { month: 'short', day: 'numeric' }) }) : '',
        s.allowance != null ? t('sel_budget') + ' ' + money(s.allowance) : ''].filter(Boolean);
      return h('div', { class: 'selrow' + (s.status === 'pending' ? '' : ' set') + (isLater ? ' later' : '') },
        h('div', { class: 'tx' },
          h('b', null, L(s, 'title')),
          bits.length ? h('small', null, bits.join(' · ')) : null,
          s.choice ? h('p', { class: 'mine' }, t('sel_your') + ': ' + s.choice) : null),
        h('div', { class: 'ra' },
          /* El plazo solo importa mientras falte escoger. Después estorba. */
          isLater ? h('span', { class: 'chip mut' }, t('sel_soon'))
            : s.status === 'ordered' ? h('span', { class: 'chip ok' }, t('sel_ordered'))
            : s.status === 'chosen' ? h('span', { class: 'chip gold' }, t('sel_done'))
            : d ? h('span', { class: 'chip ' + (d.hot ? 'bad' : 'warn') }, d.txt) : null,
          (isLater || s.status === 'ordered') ? null
            : h('button', { class: 'btn sm' + (s.status === 'pending' ? '' : ' ghost'), type: 'button',
                onclick: function () { askFor(s); } }, s.status === 'pending' ? t('sel_choose') : t('sel_change'))));
    }

    /* ojo: .map(row) le pasaría el índice como segundo argumento y la fila 0
       quedaría distinta de las demás. Por eso cada grupo se envuelve a mano. */
    function rows(list, isLater) {
      return h('div', { class: 'sellist' + (isLater ? ' soon' : '') },
        list.map(function (x) { return row(x, isLater); }));
    }

    return h('section', { class: 'card' },
      h('h3', null, t('sel_h')),
      dueNow.length ? h('h4', { class: 'selgrp due' }, t('sel_g_due')) : null,
      dueNow.length ? rows(dueNow, false) : null,
      later.length ? h('h4', { class: 'selgrp' }, t('sel_g_later')) : null,
      later.length ? rows(later, true) : null,
      (!dueNow.length && !later.length)
        ? h('div', { class: 'empty' }, h('p', null, t('sel_none')), h('small', null, t('sel_none_sub')))
        : null,
      done.length ? h('h4', { class: 'selgrp' }, t('sel_g_done')) : null,
      done.length ? h('div', { class: 'sellist muted' },
        done.map(function (x) { return row(x, false); })) : null);
  }

  /* --- pagos --- */
  function paymentsCard(pays) {
    if (!pays.length) return h('section', { class: 'card' }, h('h3', null, t('pay_h')),
      h('div', { class: 'empty' }, h('p', null, t('pay_none'))));
    var paid = pays.filter(function (p) { return p.paid_on; });
    var due = pays.filter(function (p) { return !p.paid_on; });
    var tp = paid.reduce(function (a, p) { return a + Number(p.amount); }, 0);
    var td = due.reduce(function (a, p) { return a + Number(p.amount); }, 0);
    var nxt = due.filter(function (p) { return p.due_on; })
                 .sort(function (a, b) { return String(a.due_on).localeCompare(String(b.due_on)); })[0];
    return h('section', { class: 'card' },
      h('h3', null, t('pay_h')),
      h('div', { class: 'stats' },
        h('div', { class: 'stat ok' }, h('span', null, t('pay_paid')), h('b', null, money(tp))),
        h('div', { class: 'stat' + (td > 0 ? ' warn' : '') }, h('span', null, t('pay_due')), h('b', null, money(td))),
        nxt ? h('div', { class: 'stat' }, h('span', null, t('pay_next')), h('b', null, money(nxt.amount)),
          h('small', null, fDate(dayOf(nxt.due_on)))) : null),
      h('div', { class: 'paylist' }, pays.slice()
        .sort(function (a, b) { return (a.sort || 0) - (b.sort || 0); })
        .map(function (p) {
          return h('div', { class: 'payrow' + (p.paid_on ? ' done' : '') },
            h('div', null, h('b', null, L(p, 'label')),
              h('small', null, p.paid_on ? t('pay_on', { d: fDate(dayOf(p.paid_on)) })
                : p.due_on ? t('pay_by', { d: fDate(dayOf(p.due_on)) }) : '')),
            h('b', { class: 'amt' }, money(p.amount)));
        })));
  }

  /* --- avances y fotos --- */
  function updatesCard(msgs, urls, project, reload) {
    var txt = h('textarea', { rows: 2, placeholder: t('upd_write'), 'aria-label': t('upd_write') });
    var send = h('button', { class: 'btn sm', type: 'submit' }, t('upd_send'));
    var form = h('form', { class: 'cbox', onsubmit: function (e) {
      e.preventDefault();
      var v = txt.value.trim();
      if (!v) return;
      busy(send, true);
      sb.auth.getUser().then(function (u) {
        return sb.from('messages').insert({
          project_id: project.id, author_id: u.data.user.id,
          kind: 'text', body: v, for_client: true
        });
      }).then(function (r) {
        busy(send, false);
        if (r && r.error) { toast(r.error.message || t('err'), true); return; }
        txt.value = ''; reload();
      });
    } }, txt, send);

    var items = msgs.slice().sort(function (a, b) { return String(b.created_at).localeCompare(String(a.created_at)); });
    return h('section', { class: 'card' },
      h('h3', null, t('upd_h')),
      form,
      items.length ? h('div', { class: 'feed' }, items.map(function (m) {
        var mine = m.author_id === window.__me;
        return h('div', { class: 'msg' + (mine ? ' mine' : '') },
          h('div', { class: 'who' }, mine ? t('upd_you') : t('upd_team'),
            h('span', null, fDate(m.created_at, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }))),
          m.body ? h('p', null, m.body) : null,
          (m.file_path && urls[m.file_path])
            ? h('img', { class: 'ph', src: urls[m.file_path], alt: m.body || '', loading: 'lazy' })
            : null);
      })) : h('div', { class: 'empty' }, h('p', null, t('upd_none')), h('small', null, t('upd_none_sub'))));
  }

  /* ---------- carga ---------- */
  function load() {
    var main = document.querySelector('main') || shell({});
    fill(main, spin());
    var project = null;

    sb.from('projects').select('*').limit(1).then(function (r) {
      if (r.error) throw r.error;
      if (!r.data || !r.data.length) {
        fill(main, h('div', { class: 'empty big' },
          h('p', null, t('no_project')), h('small', null, t('no_project_sub'))));
        return null;
      }
      project = r.data[0];
      return Promise.all([
        sb.from('scope_items').select('*').eq('project_id', project.id),
        sb.from('selections').select('*').eq('project_id', project.id),
        sb.from('client_payments').select('*').eq('project_id', project.id),
        sb.from('messages').select('*').eq('project_id', project.id),
        sb.from('selection_options').select('*')
      ]);
    }).then(function (res) {
      if (!res) return;
      var phases = res[0].data || [], sels = res[1].data || [],
          pays = res[2].data || [], msgs = res[3].data || [];
      /* las opciones, agrupadas por selección */
      var opts = {};
      (res[4].data || []).forEach(function (o) {
        (opts[o.selection_id] = opts[o.selection_id] || []).push(o);
      });
      var paths = msgs.map(function (m) { return m.file_path; })
        .concat((res[4].data || []).map(function (o) { return o.photo_path; }))
        .filter(Boolean);
      var p = paths.length
        ? sb.storage.from('project-files').createSignedUrls(paths, 3600)
        : Promise.resolve({ data: [] });
      return p.then(function (su) {
        var urls = {};
        (su.data || []).forEach(function (x) { if (x.signedUrl) urls[x.path] = x.signedUrl; });
        fill(main,
          heroCard(project, phases),
          selectionsCard(sels, opts, urls, load),
          paymentsCard(pays),
          updatesCard(msgs, urls, project, load),
          stagesCard(phases));
      });
    }).catch(function (e) {
      console.warn(e);
      fill(main, h('div', { class: 'empty big' }, h('p', null, t('err'))));
    });
  }

  /* ---------- arranque ---------- */
  function start() {
    if (!CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY || !window.supabase) {
      fill(app(), h('div', { class: 'empty big' },
        h('p', null, 'Falta conectar la base de datos.'),
        h('small', null, 'Pega la URL y la llave de Supabase en config.js.')));
      return;
    }
    if (!sb) sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
    fill(app(), spin());
    sb.auth.getSession().then(function (r) {
      var s = r.data && r.data.session;
      if (!s) return authScreen();
      window.__me = s.user.id;
      shell({});
      load();
    }).catch(function () { authScreen(); });
  }

  document.addEventListener('DOMContentLoaded', start);
})();
