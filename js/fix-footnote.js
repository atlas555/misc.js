(function(d) {
  // add [] to footnote numbers
  d.querySelectorAll('sup[id^="fnref:"] > a.footnote-ref, a.footnote-ref > sup').forEach(el => {
    if (/^[0-9]+$/.test(el.innerText)) el.innerText = ' [' + el.innerText + ']';
  });
  // move the return symbol into the previous <p>
  d.querySelectorAll('.footnotes > ol > li > p ~ .footnote-return').forEach(el => {
    el.previousElementSibling.lastChild.after(el);
  });
})(document);
