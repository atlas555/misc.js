// waterfall script
function waterfall(a) {
    function b(a, b) {
        var c = window.getComputedStyle(b);
        return parseFloat(c["margin" + a]) || 0
    }
    function c(a) {
        return a + "px"
    }
    function d(a) {
        return parseFloat(a.style.top)
    }
    function e(a) {
        return parseFloat(a.style.left)
    }
    function f(a) {
        return a.clientWidth
    }
    function g(a) {
        return a.clientHeight
    }
    function h(a) {
        return d(a) + g(a) + b("Bottom", a)
    }
    function i(a) {
        return e(a) + f(a) + b("Right", a)
    }
    function j(a) {
        a = a.sort(function(a, b) {
            return h(a) === h(b) ? e(b) - e(a) : h(b) - h(a)
        })
    }
    function k(b) {
        f(a) != t && (b.target.removeEventListener(b.type, arguments.callee), waterfall(a))
    }
    "string" == typeof a && (a = document.querySelector(a));
    var l = [].map.call(a.children,
    function(a) {
        return a.style.position = "absolute",
        a
    });
    a.style.position = "relative";
    var m = [];
    l.length && (l[0].style.top = "0px", l[0].style.left = c(b("Left", l[0])), m.push(l[0]));
    for (var n = 1; n < l.length; n++) {
        var o = l[n - 1],
        p = l[n],
        q = i(o) + f(p) <= f(a);
        if (!q) break;
        p.style.top = o.style.top,
        p.style.left = c(i(o) + b("Left", p)),
        m.push(p)
    }
    for (; n < l.length; n++) {
        j(m);
        var p = l[n],
        r = m.pop();
        p.style.top = c(h(r) + b("Top", p)),
        p.style.left = c(e(r)),
        m.push(p)
    }
    j(m);
    var s = m[0];
    a.style.height = c(h(s) + b("Bottom", s));
    var t = f(a);
    window.addEventListener ? window.addEventListener("resize", k) : document.body.onresize = k
}
//imgStatus
!
function() {
    this.loaded = 0,
    this.failed = 0,
    this.total = 0,
    this.watch = function(a, b) {
        var c = document.querySelectorAll(a);
        if (!c.length) return console.log("[imgStatus]: There aren't any images associated with this selector (" + a + ")!");
        this.total = c.length;
        for (var d = 0; d < this.total; d++) isCached(c[d].src) ? this._setLoaded(b) : c[d].addEventListener ? (c[d].addEventListener("load", this._setLoaded.bind(this, b)), c[d].addEventListener("error", this._setFailed.bind(this, b))) : (c[d].attachEvent("onload", this._setLoaded.bind(this, b)), c[d].attachEvent("onerror", this._setFailed.bind(this, b)))
    },
    this.isCached = function(a) {
        var b = new Image;
        return b.src = a,
        b.complete
    },
    this._setFailed = function(a, b) {++this.failed,
        "function" == typeof a && a(this)
    },
    this._setLoaded = function(a, b) {++this.loaded,
        "function" == typeof a && a(this)
    },
    this.isDone = function() {
        return this.loaded + this.failed === this.total ? !0 : !1
    },
    "object" == typeof window && (window.imgStatus = this)
} ();

document.addEventListener('DOMContentLoaded', () => {
let galleryPhotos = document.querySelectorAll('.gallery-photos') || ''
if(galleryPhotos){
  imgStatus.watch('.gallery-photo img', function(imgs) {
    if(imgs.isDone()){
      for(var i=0;i < galleryPhotos.length;i++){
        waterfall(galleryPhotos[i]);
        let pagePhoto = galleryPhotos[i].querySelectorAll('.gallery-photo');
        for(var j=0;j < pagePhoto.length;j++){pagePhoto[j].className += " visible"};
      }
    }
  });
  window.addEventListener('resize', function () {
    for(var i=0;i < galleryPhotos.length;i++){
      waterfall(galleryPhotos[i]);
    }
  });
}
});

//view-image
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(b) {
    return b.raw = b
};
$jscomp.createTemplateTagFirstArgWithRaw = function(b, a) {
    b.raw = a;
    return b
};
$jscomp.arrayIteratorImpl = function(b) {
    var a = 0;
    return function() {
        return a < b.length ? {
            done: !1,
            value: b[a++]
        }: {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(b) {
    return {
        next: $jscomp.arrayIteratorImpl(b)
    }
};
$jscomp.makeIterator = function(b) {
    var a = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
    return a ? a.call(b) : $jscomp.arrayIterator(b)
};
$jscomp.arrayFromIterator = function(b) {
    for (var a, d = []; ! (a = b.next()).done;) d.push(a.value);
    return d
};
$jscomp.arrayFromIterable = function(b) {
    return b instanceof Array ? b: $jscomp.arrayFromIterator($jscomp.makeIterator(b))
}; (function() {
    window.ViewImage = new
    function() {
        var b = this;
        this.target = "[view-image] img";
        this.listener = function(a) {
            if (! (a.ctrlKey || a.metaKey || a.shiftKey || a.altKey)) {
                var d = String(b.target.split(",").map(function(g) {
                    return g.trim() + ":not([no-view])"
                })),
                c = a.target.closest(d);
                if (c) {
                    var e = c.closest("[view-image]") || document.body;
                    d = [].concat($jscomp.arrayFromIterable(e.querySelectorAll(d))).map(function(g) {
                        return g.href || g.src
                    });
                    b.display(d, c.href || c.src);
                    a.stopPropagation();
                    a.preventDefault()
                }
            }
        };
        this.init = function(a) {
            a && (b.target = a); ["removeEventListener", "addEventListener"].forEach(function(d) {
                document[d]("click", b.listener, !1)
            })
        };
        this.display = function(a, d) {
            var c = a.indexOf(d),
            e = (new DOMParser).parseFromString('\n                <div class="view-image">\n                    <style>.view-image{position:fixed;inset:0;z-index:500;padding:1rem;display:flex;flex-direction:column;animation:view-image-in 300ms;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}.view-image__out{animation:view-image-out 300ms}@keyframes view-image-in{0%{opacity:0}}@keyframes view-image-out{100%{opacity:0}}.view-image-btn{width:32px;height:32px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-radius:3px;background-color:rgba(255,255,255,0.2)}.view-image-btn:hover{background-color:rgba(255,255,255,0.5)}.view-image-close__full{position:absolute;inset:0;background-color:rgba(48,55,66,0.3);z-index:unset;cursor:zoom-out;margin:0}.view-image-container{height:0;flex:1;display:flex;align-items:center;justify-content:center;}.view-image-lead{display:contents}.view-image-lead img{position:relative;z-index:1;max-width:100%;max-height:100%;object-fit:contain;border-radius:3px}.view-image-lead__in img{animation:view-image-lead-in 300ms}.view-image-lead__out img{animation:view-image-lead-out 300ms forwards}@keyframes view-image-lead-in{0%{opacity:0;transform:translateY(-20px)}}@keyframes view-image-lead-out{100%{opacity:0;transform:translateY(20px)}}[class*=__out] ~ .view-image-loading{display:block}.view-image-loading{position:absolute;inset:50%;width:8rem;height:2rem;color:#aab2bd;overflow:hidden;text-align:center;margin:-1rem -4rem;z-index:1;display:none}.view-image-loading::after{content:"";position:absolute;inset:50% 0;width:100%;height:3px;background:rgba(255,255,255,0.5);transform:translateX(-100%) translateY(-50%);animation:view-image-loading 800ms -100ms ease-in-out infinite}@keyframes view-image-loading{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.view-image-tools{position:relative;display:flex;justify-content:space-between;align-content:center;color:#fff;max-width:600px;position: absolute; bottom: 5%; left: 1rem; right: 1rem; backdrop-filter: blur(10px);margin:0 auto;padding:10px;border-radius:5px;background:rgba(0,0,0,0.1);margin-bottom:constant(safe-area-inset-bottom);margin-bottom:env(safe-area-inset-bottom);z-index:1}.view-image-tools__count{width:60px;display:flex;align-items:center;justify-content:center}.view-image-tools__flip{display:flex;gap:10px}.view-image-tools [class*=-close]{margin:0 10px}</style>\n                    <div class="view-image-container">\n                        <div class="view-image-lead"></div>\n                        <div class="view-image-loading"></div>\n                        <div class="view-image-close view-image-close__full"></div>\n                    </div>\n                    <div class="view-image-tools">\n                        <div class="view-image-tools__count">\n                            <span><b class="view-image-index">' + (c + 1) + "</b>/" + a.length + '</span>\n                        </div>\n                        <div class="view-image-tools__flip">\n                            <div class="view-image-btn view-image-tools__flip-prev">\n                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M31 36L19 24L31 12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                            </div>\n                            <div class="view-image-btn view-image-tools__flip-next">\n                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M19 12L31 24L19 36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                            </div>\n                        </div>\n                        <div class="view-image-btn view-image-close">\n                            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M8 8L40 40" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n                        </div>\n                    </div>\n                </div>\n            ', "text/html").body.firstChild,
            g = function(f) {
                var h = {
                    Escape: "close",
                    ArrowLeft: "tools__flip-prev",
                    ArrowRight: "tools__flip-next"
                };
                h[f.key] && e.querySelector(".view-image-" + h[f.key]).click()
            },
            l = function(f) {
                var h = new Image,
                k = e.querySelector(".view-image-lead");
                k.className = "view-image-lead view-image-lead__out";
                setTimeout(function() {
                    k.innerHTML = "";
                    h.onload = function() {
                        setTimeout(function() {
                            k.innerHTML = '<img src="' + h.src + '" alt="ViewImage" no-view/>';
                            k.className = "view-image-lead view-image-lead__in"
                        },
                        100)
                    };
                    h.src = f
                },
                300)
            };
            document.body.appendChild(e);
            l(d);
            window.addEventListener("keydown", g);
            e.onclick = function(f) {
                f.target.closest(".view-image-close") ? (window.removeEventListener("keydown", g), e.onclick = null, e.classList.add("view-image__out"), setTimeout(function() {
                    return e.remove()
                },
                290)) : f.target.closest(".view-image-tools__flip") && (c = f.target.closest(".view-image-tools__flip-prev") ? 0 === c ? a.length - 1 : c - 1 : c === a.length - 1 ? 0 : c + 1, l(a[c]), e.querySelector(".view-image-index").innerHTML = c + 1)
            }
        }
    }
})();

window.ViewImage && ViewImage.init('.gallery-photo img')
