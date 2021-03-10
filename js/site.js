/* ------------------------------------- */
/* --------------- LOADER -------------- */
/* ------------------------------------- */

$(window).on("load", function () {
  $(".loader").fadeOut("1000");
});

/* ------------------------------------- */
/* ------------- GALERIE LI ------------ */
/* ------------------------------------- */

$("#galery li").hover(
  function () {
    $(this).css("transform", "scale(1.01)");
    $(this).siblings().css({
      opacity: "0.80",
      transform: "scale(0.99)",
      filter: "grayscale(100%)",
    });
  },
  function () {
    $(this).css("transform", "scale(1)");
    $(this).siblings().css({
      opacity: "",
      transform: "",
      filter: "",
    });
  }
);

/* ------------------------------------- */
/* ----- BOUTON FORMULAIRE CONTACT ----- */
/* ------------------------------------- */

$(".button").hover(
  function () {
    $("#submit p").css("transform", "translateX(3px)");
    $("#submit i").css({
      transform: "translateX(15px)",
      opacity: "1",
    });
  },
  function () {
    $("#submit p").css("transform", "translateX(10px)");
    $("#submit i").css({
      transform: "translateX(30px)",
      opacity: "0",
    });
  }
);

/* ------------------------------------- */
/* ---------- LOGO HAMBURGER ----------- */
/* ------------------------------------- */

$(".menu_hamburger").hover(
  function () {
    $(".menu_hamburger span.main_hambg").css({
      transform: "translate(-50%, -50%) rotate(0deg)",
      top: "50%",
      left: "50%",
      width: "30px",
      opacity: "1",
    });
    $(".menu_hamburger span.scnd_hambg").css({
      transform: "translate(-50%, -50%) rotate(0deg) translateY(-10px)",
      top: "50%",
      left: "50%",
      width: "30px",
    });
    $(".menu_hamburger span.third_hambg").css({
      transform: "translate(-50%, -50%) rotate(0deg)",
      top: "50%",
      left: "50%",
      opacity: "0",
      width: "30px",
    });
    $(".menu_hamburger span.fourth_hambg").css({
      transform: "translate(-50%, -50%) rotate(0deg) translateY(10px)",
      top: "50%",
      left: "50%",
      width: "30px",
    });
    $(".menu_hamburger span").css({
      background: "rgba(255, 255, 255, 0.7)",
      border: "",
      height: "4px",
    });
  },

  function () {
    $(".menu_hamburger span.main_hambg").css({
      transform: "",
      top: "",
      left: "",
      opacity: "",
      width: "",
    });
    $(".menu_hamburger span.scnd_hambg").css({
      transform: "",
      top: "",
      left: "",
      width: "",
      transform: "",
    });
    $(".menu_hamburger span.third_hambg").css({
      transform: "",
      top: "",
      left: "",
      opacity: "",
      width: "",
    });
    $(".menu_hamburger span.fourth_hambg").css({
      transform: "",
      top: "",
      left: "",
      width: "",
      transform: "",
    });
    $(".menu_hamburger span").css({
      background: "",
      border: "",
      height: "",
    });
  }
);

/* ------------------------------------- */
/* ------------- Send FORM ------------- */
/* ------------------------------------- */

var returnText = $("<p></p>", {
  id: "returnText",
  css: {
    width: "90%",
    margin: "auto",
    textAlign: "center",
    fontSize: "0.9em",
    letterSpacing: "0.03em",
    ligneHeight: "20px",
    fontWeight: "900",
    color: "white",
    transition: "0.1 ease-in-out",
  },
});

$("#contactForm").submit(function (e) {
  e.preventDefault(); // annule la redirection

  var form = $(this);
  alert("Ce code fonctionne !");

  $.ajax({
    type: "POST",
    url: "../php/formulaire.php",
    data: form.serialize(),
    success: function (data, statut) {
      console.log(statut + " " + data);
      $("#returnForm").prepend(returnText);
      $("#returnText").text(data);

      if (data === "Votre message nous est bien parvenu !") {
        $("#returnText").css("color", "#4dff88");
      } else {
        $("#returnText").css("color", "#ff4d4d");
      }

      $("#returnForm").css("display", "flex");
    },
    error: function (resultat, statut, erreur) {
      alert(
        "Vous devez d'abord " +
          "<a href=../index.html#contact>envoyer le formulaire </a>"
      );
      console.log(resultat + " ; " + statut + " ; " + erreur);
    },

    complete: function (resultat, statut) {},
  });
});

/* ------------------------------------- */
/* --------------- SKILL --------------- */
/* ------------------------------------- */

$(".skill").hover(
  function () {
    $(this).css({
      border: "1px solid transparent",
      background: "rgba(255, 193, 77, 0.8)",
    });
    $("#html", this).css({
      transform: "translateY(0px)",
      opacity: "1",
    });
    $("#skill_def", this).css({
      transform: "translateY(0px)",
      opacity: "1",
    });

    $("#skill_def p", this).css({
      color: "#333333",
    });
    $("#html path, #html polygon, #html rect", this).css({
      animation: "htmlAnimate 1s linear",
    });
  },
  function () {
    $(this).css({
      border: "",
      background: "",
    });
    $("#html", this).css({
      transform: "",
      opacity: "",
    });
    $("#skill_def", this).css({
      transform: "",
      opacity: "",
    });

    $("#skill_def p", this).css({
      color: "",
    });

    $("#html path, #html polygon, #html rect", this).css({
      animation: "",
    });
  }
);

// Definition du degré de rotation

var compteur = 0;
var miniCount = 0;
var deg = 90;

$("i.fas.fa-angle-double-down").click(function () {
  compteur = compteur + deg;
  miniCount = miniCount - deg;
});

$("i.fas.fa-angle-double-up").click(function () {
  compteur = compteur - deg;
  miniCount = miniCount + deg;
});

$(".arrow").click(function () {
  $(".skill_circle").css(
    "transform",
    "translate(-50%, -50%) rotate(" + compteur + "deg)"
  );

  $(".minSkill_circle").css(
    "transform",
    "translate(-50%, -50%) rotate(" + miniCount + "deg)"
  );
});

// $("i.fas.fa-angle-double-down").click(function(e) {
//   i = i + deg;
//   minI = minI - deg;
//   e.preventDefault();

//   console.log(i);

//   $(".skill_circle").css(
//     "transform",
//     "translate(-50%, -50%) rotate(" + i + "deg)"
//   );
//   $(".minSkill_circle").css(
//     "transform",
//     "translate(-50%, -50%) rotate(" + minI + "deg)"
//   );

//   var offset = $("div.minSkill_circle:nth-child(1)").offset();
//   console.log("TOP : " + offset.top + "px, LEFT : " + offset.left + "px");
//   if (offset.top == 705 && -10.5 > offset.left > -10.9) {
//     console.log("IL EST LA ");
//   }
// });

// $("i.fas.fa-angle-double-up").click(function() {
//   i = i - deg;
//   minI = minI + deg;
//   console.log(i);
//   $(".skill_circle").css(
//     "transform",
//     "translate(-50%, -50%) rotate(" + i + "deg)"
//   );
//   $(".minSkill_circle").css(
//     "transform",
//     "translate(-50%, -50%) rotate(" + minI + "deg)"
//   );
// });
