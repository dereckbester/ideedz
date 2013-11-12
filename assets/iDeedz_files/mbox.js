var mboxCopyright = "Copyright 1996-2011. Adobe Systems Incorporated. All rights reserved.";mboxUrlBuilder = function(a, b) { this.a = a; this.b = b; this.c = new Array(); this.d = function(e) { return e; }; this.f = null;};mboxUrlBuilder.prototype.addParameter = function(g, h) { var i = new RegExp('(\'|")'); if (i.exec(g)) { throw "Parameter '" + g + "' contains invalid characters"; } for (var j = 0; j < this.c.length; j++) { var k = this.c[j]; if (k.name == g) { k.value = h; return this; } } var l = new Object(); l.name = g; l.value = h; this.c[this.c.length] = l; return this;};mboxUrlBuilder.prototype.addParameters = function(c) { if (!c) { return this; } for (var j = 0; j < c.length; j++) { var m = c[j].indexOf('='); if (m == -1 || m == 0) { continue; } this.addParameter(c[j].substring(0, m), c[j].substring(m + 1, c[j].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(n) { this.o = n;};mboxUrlBuilder.prototype.setBasePath = function(f) { this.f = f;};mboxUrlBuilder.prototype.setUrlProcessAction = function(p) { this.d = p;};mboxUrlBuilder.prototype.buildUrl = function() { var q = this.f ? this.f : '/m2/' + this.b + '/mbox/' + this.o; var r = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var e = r + "//" + this.a + q; var s = e.indexOf('?') != -1 ? '&' : '?'; for (var j = 0; j < this.c.length; j++) { var k = this.c[j]; e += s + encodeURIComponent(k.name) + '=' + encodeURIComponent(k.value); s = '&'; } return this.t(this.d(e));};mboxUrlBuilder.prototype.getParameters = function() { return this.c;};mboxUrlBuilder.prototype.setParameters = function(c) { this.c = c;};mboxUrlBuilder.prototype.clone = function() { var u = new mboxUrlBuilder(this.a, this.b); u.setServerType(this.o); u.setBasePath(this.f); u.setUrlProcessAction(this.d); for (var j = 0; j < this.c.length; j++) { u.addParameter(this.c[j].name, this.c[j].value); } return u;};mboxUrlBuilder.prototype.t = function(v) { return v.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');};mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + w.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = w.buildUrl(); this.x = document.createElement('script'); this.x.src = e; document.body.appendChild(this.x);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.y = new Object(); this.z = new Array();};mboxMap.prototype.put = function(A, h) { if (!this.y[A]) { this.z[this.z.length] = A; } this.y[A] = h;};mboxMap.prototype.get = function(A) { return this.y[A];};mboxMap.prototype.remove = function(A) { this.y[A] = undefined;};mboxMap.prototype.each = function(p) { for (var j = 0; j < this.z.length; j++ ) { var A = this.z[j]; var h = this.y[A]; if (h) { var B = p(A, h); if (B === false) { break; } } }};mboxFactory = function(C, b, D) { this.E = false; this.C = C; this.D = D; this.F = new mboxList(); mboxFactories.put(D, this); this.G = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.H = this.G && mboxGetPageParameter('mboxDisable') == null; var I = D == 'default'; this.J = new mboxCookieManager( 'mbox' + (I ? '' : ('-' + D)), (function() { return mboxCookiePageDomain(); })()); this.H = this.H && this.J.isEnabled() && (this.J.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.K(); this.L = mboxGenerateId(); this.M = mboxScreenHeight(); this.N = mboxScreenWidth(); this.O = mboxBrowserWidth(); this.P = mboxBrowserHeight(); this.Q = mboxScreenColorDepth(); this.R = mboxBrowserTimeOffset(); this.S = new mboxSession(this.L, 'mboxsession', 'session', 31 * 60, this.J); this.T = new mboxPC('PC', 1209600, this.J); this.w = new mboxUrlBuilder(C, b); this.U(this.w, I); this.V = new Date().getTime(); this.W = this.V; var X = this; this.addOnLoad(function() { X.W = new Date().getTime(); }); if (this.G) { this.addOnLoad(function() { X.E = true; X.getMboxes().each(function(Y) { Y.setFetcher(new mboxAjaxFetcher()); Y.finalize(); }); }); this.limitTraffic(100, 10368000); if (this.H) { this.Z(); this._ = new mboxSignaler(function(ab, c) { return X.create(ab, c); }, this.J); } }};mboxFactory.prototype.forcePCId = function(bb) { if (this.T.forceId(bb)) { this.S.forceId(mboxGenerateId()); }};mboxFactory.prototype.forceSessionId = function(bb) { this.S.forceId(bb);};mboxFactory.prototype.isEnabled = function() { return this.H;};mboxFactory.prototype.getDisableReason = function() { return this.J.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.G;};mboxFactory.prototype.disable = function(cb, db) { if (typeof cb == 'undefined') { cb = 60 * 60; } if (typeof db == 'undefined') { db = 'unspecified'; } if (!this.isAdmin()) { this.H = false; this.J.setCookie('disable', db, cb); }};mboxFactory.prototype.enable = function() { this.H = true; this.J.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(eb, cb) {};mboxFactory.prototype.addOnLoad = function(fb) { if (this.isDomLoaded()) { fb(); } else { var gb = false; var hb = function() { if (gb) { return; } gb = true; fb(); }; this.ib.push(hb); if (this.isDomLoaded() && !gb) { hb(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.W - this.V;};mboxFactory.prototype.getEllapsedTimeUntil = function(jb) { return jb - this.V;};mboxFactory.prototype.getMboxes = function() { return this.F;};mboxFactory.prototype.get = function(ab, kb) { return this.F.get(ab).getById(kb || 0);};mboxFactory.prototype.update = function(ab, c) { if (!this.isEnabled()) { return; } if (!this.isDomLoaded()) { var X = this; this.addOnLoad(function() { X.update(ab, c); }); return; } if (this.F.get(ab).length() == 0) { throw "Mbox " + ab + " is not defined"; } this.F.get(ab).each(function(Y) { Y.getUrlBuilder() .addParameter('mboxPage', mboxGenerateId()); Y.load(c); });};mboxFactory.prototype.create = function( ab, c, lb) { if (!this.isSupported()) { return null; } var e = this.w.clone(); e.addParameter('mboxCount', this.F.length() + 1); e.addParameters(c); var kb = this.F.get(ab).length(); var mb = this.D + '-' + ab + '-' + kb; var nb; if (lb) { nb = new mboxLocatorNode(lb); } else { if (this.E) { throw 'The page has already been loaded, can\'t write marker'; } nb = new mboxLocatorDefault(mb); } try { var X = this; var ob = 'mboxImported-' + mb; var Y = new mbox(ab, kb, e, nb, ob); if (this.H) { Y.setFetcher( this.E ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } Y.setOnError(function(pb, n) { Y.setMessage(pb); Y.activate(); if (!Y.isActivated()) { X.disable(60 * 60, pb); window.location.reload(false); } }); this.F.add(Y); } catch (qb) { this.disable(); throw 'Failed creating mbox "' + ab + '", the error was: ' + qb; } var rb = new Date(); e.addParameter('mboxTime', rb.getTime() - (rb.getTimezoneOffset() * 60000)); return Y;};mboxFactory.prototype.getCookieManager = function() { return this.J;};mboxFactory.prototype.getPageId = function() { return this.L;};mboxFactory.prototype.getPCId = function() { return this.T;};mboxFactory.prototype.getSessionId = function() { return this.S;};mboxFactory.prototype.getSignaler = function() { return this._;};mboxFactory.prototype.getUrlBuilder = function() { return this.w;};mboxFactory.prototype.U = function(e, I) { e.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.S.getId()); if (!I) { e.addParameter('mboxFactoryId', this.D); } if (this.T.getId() != null) { e.addParameter('mboxPC', this.T.getId()); } e.addParameter('mboxPage', this.L); e.addParameter('screenHeight', this.M); e.addParameter('screenWidth', this.N); e.addParameter('browserWidth', this.O); e.addParameter('browserHeight', this.P); e.addParameter('browserTimeOffset', this.R); e.addParameter('colorDepth', this.Q); e.setUrlProcessAction(function(e) { e += '&mboxURL=' + encodeURIComponent(document.location); var sb = encodeURIComponent(document.referrer); if (e.length + sb.length < 2000) { e += '&mboxReferrer=' + sb; } e += '&mboxVersion=' + mboxVersion; return e; });};mboxFactory.prototype.tb = function() { return "";};mboxFactory.prototype.Z = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.E;};mboxFactory.prototype.K = function() { if (this.ib != null) { return; } this.ib = new Array(); var X = this; (function() { var ub = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var vb = false; var wb = function() { if (vb) { return; } vb = true; for (var i = 0; i < X.ib.length; ++i) { X.ib[i](); } }; if (document.addEventListener) { document.addEventListener(ub, function() { document.removeEventListener(ub, arguments.callee, false); wb(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); wb(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(ub, function() { if (document.readyState === 'complete') { document.detachEvent(ub, arguments.callee); wb(); } }); } else { var xb = function() { try { document.documentElement.doScroll('left'); wb(); } catch (yb) { setTimeout(xb, 13); } }; xb(); } } if (document.readyState === "complete") { wb(); } })();};mboxSignaler = function(zb, J) { this.J = J; var Ab = J.getCookieNames('signal-'); for (var j = 0; j < Ab.length; j++) { var Bb = Ab[j]; var Cb = J.getCookie(Bb).split('&'); var Y = zb(Cb[0], Cb); Y.load(); J.deleteCookie(Bb); }};mboxSignaler.prototype.signal = function(Db, ab ) { this.J.setCookie('signal-' + Db, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.F = new Array();};mboxList.prototype.add = function(Y) { if (Y != null) { this.F[this.F.length] = Y; }};mboxList.prototype.get = function(ab) { var B = new mboxList(); for (var j = 0; j < this.F.length; j++) { var Y = this.F[j]; if (Y.getName() == ab) { B.add(Y); } } return B;};mboxList.prototype.getById = function(Eb) { return this.F[Eb];};mboxList.prototype.length = function() { return this.F.length;};mboxList.prototype.each = function(p) { if (typeof p != 'function') { throw 'Action must be a function, was: ' + typeof(p); } for (var j = 0; j < this.F.length; j++) { p(this.F[j]); }};mboxLocatorDefault = function(g) { this.g = 'mboxMarker-' + g; document.write('<div id="' + this.g + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var Fb = document.getElementById(this.g); while (Fb != null) { if (Fb.nodeType == 1) { if (Fb.className == 'mboxDefault') { return Fb; } } Fb = Fb.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var Gb = document.createElement('div'); Gb.className = 'mboxDefault'; var Hb = document.getElementById(this.g); Hb.parentNode.insertBefore(Gb, Hb); return Gb;};mboxLocatorNode = function(Ib) { this.Fb = Ib;};mboxLocatorNode.prototype.locate = function() { return typeof this.Fb == 'string' ? document.getElementById(this.Fb) : this.Fb;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(ab ) { var Y = mboxFactoryDefault.create( ab, mboxShiftArray(arguments)); if (Y) { Y.load(); } return Y;};mboxDefine = function(lb, ab ) { var Y = mboxFactoryDefault.create(ab, mboxShiftArray(mboxShiftArray(arguments)), lb); return Y;};mboxUpdate = function(ab ) { mboxFactoryDefault.update(ab, mboxShiftArray(arguments));};mbox = function(g, Jb, w, Kb, ob) { this.Lb = null; this.Mb = 0; this.nb = Kb; this.ob = ob; this.Nb = null; this.Ob = new mboxOfferContent(); this.Gb = null; this.w = w; this.message = ''; this.Pb = new Object(); this.Qb = 0; this.Jb = Jb; this.g = g; this.Rb(); w.addParameter('mbox', g) .addParameter('mboxId', Jb); this.Sb = function() {}; this.Tb = function() {}; this.Ub = null;};mbox.prototype.getId = function() { return this.Jb;};mbox.prototype.Rb = function() { if (this.g.length > 250) { throw "Mbox Name " + this.g + " exceeds max length of " + "250 characters."; } else if (this.g.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.g + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.g;};mbox.prototype.getParameters = function() { var c = this.w.getParameters(); var B = new Array(); for (var j = 0; j < c.length; j++) { if (c[j].name.indexOf('mbox') != 0) { B[B.length] = c[j].name + '=' + c[j].value; } } return B;};mbox.prototype.setOnLoad = function(p) { this.Tb = p; return this;};mbox.prototype.setMessage = function(pb) { this.message = pb; return this;};mbox.prototype.setOnError = function(Sb) { this.Sb = Sb; return this;};mbox.prototype.setFetcher = function(Vb) { if (this.Nb) { this.Nb.cancel(); } this.Nb = Vb; return this;};mbox.prototype.getFetcher = function() { return this.Nb;};mbox.prototype.load = function(c) { if (this.Nb == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Mb = 0; var w = (c && c.length > 0) ? this.w.clone().addParameters(c) : this.w; this.Nb.fetch(w); var X = this; this.Wb = setTimeout(function() { X.Sb('browser timeout', X.Nb.getType()); }, 15000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var X = this; setTimeout(function() { X.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Mb) { return this.Mb; } this.setEventTime('activate' + ++this.Qb + '.start'); if (this.show()) { this.cancelTimeout(); this.Mb = 1; } this.setEventTime('activate' + this.Qb + '.end'); return this.Mb;};mbox.prototype.isActivated = function() { return this.Mb;};mbox.prototype.setOffer = function(Ob) { if (Ob && Ob.show && Ob.setOnLoad) { this.Ob = Ob; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Ob;};mbox.prototype.show = function() { this.setEventTime('show.start'); var B = this.Ob.show(this); this.setEventTime(B == 1 ? "show.end.ok" : "show.end"); return B;};mbox.prototype.showContent = function(Xb) { if (Xb == null) { return 0; } if (this.Gb == null || !this.Gb.parentNode) { this.Gb = this.getDefaultDiv(); if (this.Gb == null) { return 0; } } if (this.Gb != Xb) { this.Yb(this.Gb); this.Gb.parentNode.replaceChild(Xb, this.Gb); this.Gb = Xb; } this.Zb(Xb); this.Tb(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var B = this.showContent(this.getDefaultDiv()); this.setEventTime(B == 1 ? 'hide.end.ok' : 'hide.end.fail'); return B;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.nb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.Wb) { clearTimeout(this.Wb); } if (this.Nb != null) { this.Nb.cancel(); }};mbox.prototype.getDiv = function() { return this.Gb;};mbox.prototype.getDefaultDiv = function() { if (this.Ub == null) { this.Ub = this.nb.locate(); } return this.Ub;};mbox.prototype.setEventTime = function(_b) { this.Pb[_b] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Pb;};mbox.prototype.getImportName = function() { return this.ob;};mbox.prototype.getURL = function() { return this.w.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.w;};mbox.prototype.ac = function(Gb) { return Gb.style.display != 'none';};mbox.prototype.Zb = function(Gb) { this.bc(Gb, true);};mbox.prototype.Yb = function(Gb) { this.bc(Gb, false);};mbox.prototype.bc = function(Gb, cc) { Gb.style.visibility = cc ? "visible" : "hidden"; Gb.style.display = cc ? "block" : "none";};mboxOfferContent = function() { this.Tb = function() {};};mboxOfferContent.prototype.show = function(Y) { var B = Y.showContent(document.getElementById(Y.getImportName())); if (B == 1) { this.Tb(); } return B;};mboxOfferContent.prototype.setOnLoad = function(Tb) { this.Tb = Tb;};mboxOfferAjax = function(Xb) { this.Xb = Xb; this.Tb = function() {};};mboxOfferAjax.prototype.setOnLoad = function(Tb) { this.Tb = Tb;};mboxOfferAjax.prototype.show = function(Y) { var dc = document.createElement('div'); dc.id = Y.getImportName(); dc.innerHTML = this.Xb; var B = Y.showContent(dc); if (B == 1) { this.Tb(); } return B;};mboxOfferDefault = function() { this.Tb = function() {};};mboxOfferDefault.prototype.setOnLoad = function(Tb) { this.Tb = Tb;};mboxOfferDefault.prototype.show = function(Y) { var B = Y.hide(); if (B == 1) { this.Tb(); } return B;};mboxCookieManager = function mboxCookieManager(g, ec) { this.g = g; this.ec = ec == '' || ec.indexOf('.') == -1 ? '' : '; domain=' + ec; this.fc = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(g, h, cb) { if (typeof g != 'undefined' && typeof h != 'undefined' && typeof cb != 'undefined') { var gc = new Object(); gc.name = g; gc.value = escape(h); gc.expireOn = Math.ceil(cb + new Date().getTime() / 1000); this.fc.put(g, gc); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(g) { var gc = this.fc.get(g); return gc ? unescape(gc.value) : null;};mboxCookieManager.prototype.deleteCookie = function(g) { this.fc.remove(g); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(hc) { var ic = new Array(); this.fc.each(function(g, gc) { if (g.indexOf(hc) == 0) { ic[ic.length] = g; } }); return ic;};mboxCookieManager.prototype.saveCookies = function() { var jc = new Array(); var kc = 0; this.fc.each(function(g, gc) { jc[jc.length] = g + '#' + gc.value + '#' + gc.expireOn; if (kc < gc.expireOn) { kc = gc.expireOn; } }); var lc = new Date(kc * 1000); document.cookie = this.g + '=' + jc.join('|') + '; expires=' + lc.toGMTString() + '; path=/' + this.ec;};mboxCookieManager.prototype.loadCookies = function() { this.fc = new mboxMap(); var mc = document.cookie.indexOf(this.g + '='); if (mc != -1) { var nc = document.cookie.indexOf(';', mc); if (nc == -1) { nc = document.cookie.indexOf(',', mc); if (nc == -1) { nc = document.cookie.length; } } var oc = document.cookie.substring( mc + this.g.length + 1, nc).split('|'); var pc = Math.ceil(new Date().getTime() / 1000); for (var j = 0; j < oc.length; j++) { var gc = oc[j].split('#'); if (pc <= gc[2]) { var qc = new Object(); qc.name = gc[0]; qc.value = gc[1]; qc.expireOn = gc[2]; this.fc.put(qc.name, qc); } } }};mboxSession = function(rc, sc, Bb, tc, J) { this.sc = sc; this.Bb = Bb; this.tc = tc; this.J = J; this.uc = false; this.Jb = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.sc); if (this.Jb == null || this.Jb.length == 0) { this.Jb = J.getCookie(Bb); if (this.Jb == null || this.Jb.length == 0) { this.Jb = rc; this.uc = true; } } J.setCookie(Bb, this.Jb, tc);};mboxSession.prototype.getId = function() { return this.Jb;};mboxSession.prototype.forceId = function(bb) { this.Jb = bb; this.J.setCookie(this.Bb, this.Jb, this.tc);};mboxPC = function(Bb, tc, J) { this.Bb = Bb; this.tc = tc; this.J = J; this.Jb = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : J.getCookie(Bb); if (this.Jb != null) { J.setCookie(Bb, this.Jb, tc); }};mboxPC.prototype.getId = function() { return this.Jb;};mboxPC.prototype.forceId = function(bb) { if (this.Jb != bb) { this.Jb = bb; this.J.setCookie(this.Bb, this.Jb, this.tc); return true; } return false;};mboxGetPageParameter = function(g) { var B = null; var vc = new RegExp(g + "=([^\&]*)"); var wc = vc.exec(document.location); if (wc != null && wc.length >= 2) { B = wc[1]; } return B;};mboxSetCookie = function(g, h, cb) { return mboxFactoryDefault.getCookieManager().setCookie(g, h, cb);};mboxGetCookie = function(g) { return mboxFactoryDefault.getCookieManager().getCookie(g);};mboxCookiePageDomain = function() { var ec = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var xc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!xc.exec(ec)) { var yc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(ec); if (yc) { ec = yc[0]; } } return ec ? ec: "";};mboxShiftArray = function(zc) { var B = new Array(); for (var j = 1; j < zc.length; j++) { B[B.length] = zc[j]; } return B;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};if (typeof mboxVersion == 'undefined') { var mboxVersion = 40; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('adobe.tt.omtrdc.net', 'adobe', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"http://admin9.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=adobe.tt.omtrdc.net' + '&clientCode=adobe"><' + '\/scr' + 'ipt>');};mboxScPluginFetcher = function(b, Ac) { this.b = b; this.Ac = Ac;};mboxScPluginFetcher.prototype.Bc = function(w) { w.setBasePath('/m2/' + this.b + '/sc/standard'); this.Cc(w); var e = w.buildUrl(); e += '&scPluginVersion=1'; return e;};mboxScPluginFetcher.prototype.Cc = function(w) { var Dc = [ "dynamicVariablePrefix","visitorID","vmk","ppu","charSet", "visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName", "currencyCode","variableProvider","channel","server", "pageType","transactionID","purchaseID","campaign","state","zip","events", "products","linkName","linkType","resolution","colorDepth", "javascriptVersion","javaEnabled","cookiesEnabled","browserWidth", "browserHeight","connectionType","homepage","pe","pev1","pev2","pev3", "visitorSampling","visitorSamplingGroup","dynamicAccountSelection", "dynamicAccountList","dynamicAccountMatch","trackDownloadLinks", "trackExternalLinks","trackInlineStats","linkLeaveQueryString", "linkDownloadFileTypes","linkExternalFilters","linkInternalFilters", "linkTrackVars","linkTrackEvents","linkNames","lnk","eo" ]; for (var j = 0; j < Dc.length; j++) { this.Ec(Dc[j], w); } for (var j = 1; j <= 75; j++) { this.Ec('prop' + j, w); this.Ec('eVar' + j, w); this.Ec('hier' + j, w); }};mboxScPluginFetcher.prototype.Ec = function(g, w) { var h = this.Ac[g]; if (typeof(h) === 'undefined' || h === null || h === '') { return; } w.addParameter(g, h);};mboxScPluginFetcher.prototype.cancel = function() { };mboxStandardScPluginFetcher = function(b, Ac) { mboxScPluginFetcher.call(this, b, Ac);};mboxStandardScPluginFetcher.prototype = new mboxScPluginFetcher;mboxStandardScPluginFetcher.prototype.getType = function() { return 'standard';};mboxStandardScPluginFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = this.Bc(w); document.write('<' + 'scr' + 'ipt src="' + e + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxAjaxScPluginFetcher = function(b, Ac) { mboxScPluginFetcher.call(this, b, Ac);};mboxAjaxScPluginFetcher.prototype = new mboxScPluginFetcher;mboxAjaxScPluginFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = this.Bc(w); this.x = document.createElement('script'); this.x.src = e; document.body.appendChild(this.x);};mboxAjaxScPluginFetcher.prototype.getType = function() { return 'ajax';};function mboxLoadSCPlugin(Ac) { if (!Ac) { return null; } Ac.m_tt = function(Ac) { var Fc = Ac.m_i('tt'); Fc.H = true; Fc.b = 'adobe'; Fc['_t'] = function() { if (!this.isEnabled()) { return; } var Y = this.Hc(); if (Y) { var Vb = new mboxAjaxScPluginFetcher(this.b, this.s); Y.setFetcher(Vb); Y.load(); } }; Fc.isEnabled = function() { return this.H && mboxFactoryDefault.isEnabled(); }; Fc.Hc = function() { var ab = this.Ic(); var Gb = document.createElement('DIV'); return mboxFactoryDefault.create(ab, new Array(), Gb); }; Fc.Ic = function() { var Jc = this.s.events && this.s.events.indexOf('purchase') != -1; return 'SiteCatalyst: ' + (Jc ? 'purchase' : 'event'); }; }; return Ac.loadModule('tt');};
if(typeof(mboxStandardScPluginFetcher)!='undefined'){mboxStandardScPluginFetcher.prototype.getType=function(){return'ajax'}};
if(typeof(mboxStandardScPluginFetcher)!='undefined'){mboxStandardScPluginFetcher.prototype.fetch=function(w){w.setServerType('ajax')}};

var s_optOut=document.cookie.match( '(^|;) ?' + "adobe_optout" + '=([^;]*)(;|$)' );
if (s_optOut!=-1 && s_optOut!="" && s_optOut!==null) {
document.write('<style>.' + 'mboxDefault' + ' { visibility:visible; }</style>');
mboxCreate = function(Z ) { return; }
mboxUpdate = function(Z ) { return; }
}

/*Next Page Code AAM -> T&T integration*/
//Cookie Reading Function
function tnt_readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
//If the cookie exists then read it and place the value(s) into all mboxes that will fire on the page
var aam_tnt_cval = tnt_readCookie("aam_tnt");
if(aam_tnt_cval){
	var aam_tnt_cval_array = new Array();
	aam_tnt_cval_array[0]="aamseg="+unescape(aam_tnt_cval);
	// var aam_tnt_cval_array = unescape(aam_tnt_cval).split(",");
	
	if(aam_tnt_cval_array){
		var tapMboxBuilder = mboxFactoryDefault.getUrlBuilder();
        tapMboxBuilder.addParameters(aam_tnt_cval_array);
	}
}