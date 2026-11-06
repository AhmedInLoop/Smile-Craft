  /* بيانات العيادة: عدّل القيم دي فقط */
  var CONFIG = {
    whatsapp: "201000000000",          // رقم واتساب بالصيغة الدولية بدون + (مصر: 20 ثم الرقم بدون الصفر)
    phoneDisplay: "01X XXXX XXXX",     // الرقم الظاهر على الصفحة
    bookingUrl: "",                    // اختياري: رابط حجز خارجي، لو فاضي زر احجز موعد ينزل لقسم التواصل
    address: "عنوان العيادة",
    hours: "أيام وساعات العمل",
    doctor: "د. اسم الطبيب",
    specialty: "طبيب أسنان",
    message: "السلام عليكم، عايز أحجز موعد في عيادة Smile Craft",
    images: {                          // اختياري: صورة الدكتور (رابط أو مسار ملف). لو فاضي بيظهر الرسم
      doctor: ""
    }
  };

  document.documentElement.setAttribute("dir", "rtl");
  document.documentElement.setAttribute("lang", "ar");

  function all(sel) { return document.querySelectorAll(sel); }

  var waUrl = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.message);
  all("[data-wa]").forEach(function (a) { a.href = waUrl; });

  if (CONFIG.bookingUrl) {
    all("[data-book]").forEach(function (a) { a.href = CONFIG.bookingUrl; a.target = "_blank"; a.rel = "noopener"; });
  }

  all("[data-phone]").forEach(function (el) { el.textContent = CONFIG.phoneDisplay; });
  all("[data-address]").forEach(function (el) { el.textContent = CONFIG.address; });
  all("[data-hours]").forEach(function (el) { el.textContent = CONFIG.hours; });
  all("[data-doctor]").forEach(function (el) { el.textContent = CONFIG.doctor; });
  all("[data-specialty]").forEach(function (el) { el.textContent = CONFIG.specialty; });

  Object.keys(CONFIG.images).forEach(function (key) {
    var url = CONFIG.images[key];
    var slot = document.querySelector('[data-slot="' + key + '"]');
    if (!url || !slot) return;
    var svg = slot.querySelector("svg");
    var img = document.createElement("img");
    img.className = "slot-img";
    img.alt = key === "doctor" ? CONFIG.doctor : "Smile Craft";
    img.src = url;
    img.addEventListener("load", function () {
      if (svg) svg.hidden = true;
      var chip = slot.querySelector(".chip");
      if (chip) chip.hidden = true;
    });
    slot.insertBefore(img, slot.firstChild);
  });

  all(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "تم النسخ"; setTimeout(function () { btn.textContent = "نسخ"; }, 1800); };
      var fallback = function () {
        try {
          var el = btn.parentNode.querySelector("[data-phone]");
          var r = document.createRange(); r.selectNodeContents(el);
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        } catch (e) {}
      };
      try { navigator.clipboard.writeText(CONFIG.phoneDisplay).then(done, fallback); } catch (e) { fallback(); }
    });
  });
