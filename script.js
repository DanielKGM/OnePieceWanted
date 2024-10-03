document.addEventListener("DOMContentLoaded", function () {
  // Eventos de leitura de dados do formulário
  $(".cfgSelect").change(function () {
    let opt = $(this).val();
    if ($(this).val() == "SP") {
      togglePapel();
    }
    /*
      if($(this).val()=='AN'){
        gerarNome($("#inputNome").val(), 20, 3);
        ScrollHeight();
      }
      */
  });

  $("#imgUpload").change(function () {
    readURL(this);
  });

  $("#inputNome").on("keyup", function () {
    gerarNome($(this).val(), 20, 2);
    ScrollHeight();
  });

  $("#inputCor").on("keyup", function () {
    let val = $(this).val();
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      let r = document.querySelector(":root");
      r.style.setProperty("--cor-letras", val);
    } else {
      let r = document.querySelector(":root");
      r.style.setProperty("--cor-letras", "#462b18");
    }
  });

  $("#inputDoA").change(function () {
    const doa = $("#doaTxt");
    doa.text($("#inputDoA").val());
  });

  $("#inputRecompensa").on("input", function () {
    let val = parseInt($(this).val());
    if (val != val) {
      $(this).val("");
      return;
    } else if (val > 999999999999) {
      val = 999999999999;
      $(this).val(999999999999);
    }
    const recompensa = $(".recompensa h3")[0];
    animateValue(recompensa, val, 1500);
  });

  // Gera risquinhos do poster
  risquinhos();

  // PRESETS: Nome do personagem / Recompensa
  var info = [
    "MONKEY D LUFFY/3000000000",
    "RORONOA ZORO/1111000000",
    "JINBE/1100000000",
    "VINSMOKE SANJI/1032000000",
    "NICO ROBIN/930000000",
    "GOD USOPP/500000000",
    "FRANKY/394000000",
    "NAMI/366000000",
    "CHOPPER/1000",
    "EUSTASS¨CAPTAIN¨KID/3000000000",
    "GOLD•ROGER/5564800000",
    "MARSHALL D TEACH/3996000000",
    "SHANKS/4048900000",
    "SIR CROCODILE/1960000000",
    "DRACULE MIHAWK/3590000000",
    "KAIDO/4611100000",
    "TRAFALGAR•LAW/3000000000",
    "EDWARD NEWGATE/5046000000",
  ];

  let papelShadow = [
    "#73481b",
    "#8c6134",
    "#8f5922",
    "#a47345",
    "#b98d68",
    "#8f5922",
    "#764a1e",
    "#5e3c1a",
  ];
  let papel = ["#e5e4d8", "#fffef0", "#fffef1", "#d0cfc4"];
  var randomColors = [];
  for (let i = 0; i < info.length; i++) {
    randomColors.push(
      papelShadow[getRandomInt(0, papelShadow.length - 1)] +
        "/" +
        papel[getRandomInt(0, papel.length - 1)]
    );
  }

  // Nome Inicial
  gerarNome("DANIELKGM", 20, 2);
  resize();

  var targetClass = "";
  const botao = document.querySelector(".image-buttons");
  const foto = document.querySelector("#foto-cartaz");
  const recompensa = document.querySelector(".recompensa h3");
  const cPapel = document.querySelector("#papel");
  botao.addEventListener("click", (e) => {
    const targetNode = e.target.nodeName;

    if (targetNode === "INPUT" && targetClass != e.target.className) {
      foto.src = e.target.src;
      targetClass = e.target.className;
      numero_foto = targetClass.charAt(5) + targetClass.charAt(6);
      info_personagem = info[parseInt(numero_foto)].split("/");
      const nova = parseInt(info_personagem[1]);
      animateValue(recompensa, nova, 1500);
      gerarNome(info_personagem[0], 20, 3);
      foto.src = e.target.src;
      foto.classList.add("creditos");

      // Alterar Aparência do Cartaz
      risquinhos();
      const filtro = document
        .getElementById("papelAnime")
        .querySelector("feTurbulence");
      filtro.setAttribute(
        "seed",
        targetClass.charAt(5) + targetClass.charAt(6)
      );
      let colors =
        randomColors[
          parseInt(targetClass.charAt(5) + targetClass.charAt(6))
        ].split("/");
      cPapel.style.boxShadow = "0 0 125px" + colors[0] + "inset";
      cPapel.style.backgroundColor = colors[1];
    }
  });
});
////////////
function togglePapel() {
  let papel = $("#papel");
  let r = document.querySelector(":root");
  if (papel.is(":hidden")) {
    papel.show();
    r.style.setProperty("--alphaShadow", "0.6");
    r.style.setProperty("--blend-filtro", "multiply");
    r.style.setProperty("--con-filtro", "85%");
    r.style.setProperty("--sat-filtro", "70%");
  } else {
    papel.hide();
    r.style.setProperty("--alphaShadow", "0");
    r.style.setProperty("--blend-filtro", "none");
    r.style.setProperty("--con-filtro", "100%");
    r.style.setProperty("--sat-filtro", "100%");
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      const foto = document.querySelector("#foto-cartaz");
      foto.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

/*  
      Animação números do CARTAZ
      https://codepen.io/chriscoyier/pen/xxVBqEg
  */
function animateValue(obj, end, duration) {
  let startTimestamp = null;
  const start = parseInt(obj.textContent.replaceAll(",", ""));
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(
      progress * (end - start) + start
    ).toLocaleString("en-US");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

window.addEventListener("resize", resize);

function resize() {
  // REDIMENSIONA O PAPEL
  ScrollHeight();
  // REDIMENSIONA O NOME
  const containerNome = document.getElementById("containerNomes");
  nomeResize(containerNome, "nomeCartaz");
  // REDIMENSIONA O TÍTULO
  const containerTitulo = document.getElementById("containerTitulo");
  efeitoNome(containerTitulo.children[1], containerTitulo);
}

function risquinhos() {
  const container = document.getElementById("papel");

  if (container.children.length > 0) {
    for (child of container.children) {
      container.removeChild(child);
    }
  }

  gerarRiscos(20, 0, 0, "horizontal", 80, 3, 2, false, container);
  gerarRiscos(20, 0, 100, "horizontal", 80, 3, 2, true, container);
  gerarRiscos(20, 0, 0, "vertical", 100, 2, 2, false, container);
  gerarRiscos(20, 100, 0, "vertical", 100, 2, 2, true, container);
}

function efeitoNome(h1, div) {
  // O QUANTO % O TEXTO DEVE DEFORMAR PARA CABER NO CONTAINER, EFEITO DOS CARTAZES DE OP POR ALGUM MOTIVO, ODA GÊNIO
  let deformX = div.offsetWidth / h1.offsetWidth;
  // O TEXTO NÃO PODE ESTICAR MAIS DE 0.8 DO SEU VALOR ORIGINAL, ODA GÊNIO
  deformX = deformX < 0.8 ? deformX : 0.8;
  h1.style.transform = `translate(-50%,-50%) scale(${deformX}, 1)`;
}

function nomeResize(container, classeDivs) {
  const divs = container.children;
  for (const div of divs) {
    if (div.classList.contains(classeDivs)) {
      const index = Array.from(divs).indexOf(div);
      efeitoNome(div.children[0], div);
    }
  }
}

function ScrollHeight() {
  const papel = document.querySelector("#papel");
  const container = document.querySelector("#container");
  papel.style.height = container.offsetHeight + "px";
  papel.style.width = container.offsetWidth + "px";
}

function abreviarNome(nomeCompleto) {
  const palavras = nomeCompleto.split(" ");
  if (palavras.length > 1 && $("#inputAbreviacoes").is(":checked")) {
    return palavras
      .map((palavra, index) =>
        index === 0 || index === palavras.length - 1
          ? palavra
          : palavra.charAt(0)
      )
      .join(palavras.length > 2 ? " • " : " ");
  }
  return nomeCompleto;
}

/* 
  FUNÇÃO PARA GERAR O NOME NO POSTER DE PROCURADO
    conteudo -> NOME COMPLETO
    maxSizeLinha -> TAMANHO MÁXIMO DE CARACTERES EM UMA LINHA
    maxLinhas -> TAMANHO MÁXIMO DE LINHAS NO POSTER
  */
function gerarNome(conteudo, maxSizeLinha, maxLinhas) {
  // TRATAR O CONTEÚDO
  conteudo - conteudo.replace(/\s+/g, " ").trim();
  const palavras = conteudo.split(" ");

  if (palavras == null || palavras.length == 0) {
    return false;
  }

  const container = document.getElementById("containerNomes");
  conteudo = "";
  let linha = 1;

  palavras.forEach(function (palavra, index) {
    conteudo += palavra + " ";
    if (conteudo.length > maxSizeLinha || index == palavras.length - 1) {
      if (newLine(conteudo.trim(), linha, maxLinhas, container)) {
        linha++;
        conteudo = "";
      } else {
        return true;
      }
    }
  });

  return true;
}

function newLine(conteudo, linha, maxLinhas, container) {
  if (linha > maxLinhas) {
    return false;
  }
  conteudo = abreviarNome(conteudo);
  const numeroLinhas = container.children.length;

  if (linha > numeroLinhas) {
    newDiv(conteudo, linha, container);
  } else {
    divs = container.querySelectorAll(`.container-linha`);
    div = divs[linha - 1];
    h1 = div.children[1];
    h1.textContent = conteudo;
    efeitoNome(h1, div);
    if (numeroLinhas > linha) {
      container.removeChild(divs[linha]);
      ScrollHeight();
    }
  }
  return true;
}

/*
  CRIA OS DIVS E OS H1S DO NOME DO CARTAZ
  */
function newDiv(conteudo, linha, container) {
  const div = document.createElement("div");
  div.classList.add("container-linha");
  const ph = document.createElement("h1");
  ph.classList.add("phLinha");
  const h1 = document.createElement("h1");
  h1.classList.add("txtLinha");

  ph.textContent = "A";
  h1.textContent = conteudo;
  div.appendChild(ph);
  div.appendChild(h1);
  container.appendChild(div);

  let deformY = 1;
  if (linha > 1) {
    var fontSize = getComputedStyle(document.body).getPropertyValue(
      "--font-size-nome"
    );
    fontSize = parseInt(fontSize) - 2 + "em";
    h1.style.fontSize = fontSize;
    ph.style.fontSize = fontSize;
  }
  efeitoNome(h1, div);
}

function gerarRiscos(
  quantidade, // QUANTIDADE DE RISCOS
  top, // POSITION: ABSOLUTE
  left, // POSITION: ABSOLUTE
  orientacao, // "vertical" ou "horizontal"
  rangeLinhas, // PORCENTAGEM QUE OS RISCOS PERCORREM DO CONTAINER
  tamanhoLinha, // PORCENTAGEM DO TAMANHO DOS RISCOS EM RELAÇÃO AO CONTAINER
  espessura, // ESPESSURA DOS RISCOS DO POSTER
  inverter, // INVERTER EM RELAÇÃO AO EIXO DE SUA ORIENTAÇÃO
  container
) {
  for (let i = 0; i < quantidade; i++) {
    const line = document.createElement("div");
    const random = Math.random();
    line.className = "line";
    container.appendChild(line);

    if (orientacao === "vertical") {
      line.style.width = `${espessura * random}px`;
      line.style.height = `${tamanhoLinha * Math.random()}%`;
      line.style.left = `${left + rangeLinhas * random}%`;
      line.style.top = `${top}%`;
    } else {
      line.style.height = `${espessura * random}px`;
      line.style.width = `${tamanhoLinha * Math.random()}%`;
      line.style.top = `${top + rangeLinhas * random}%`;
      line.style.left = `${left}%`;
    }
    if (inverter) {
      line.style.transform = "rotate(180deg)";
      line.style.transformOrigin = "top left";
    }
  }
}
