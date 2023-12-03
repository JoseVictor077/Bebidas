document.addEventListener("DOMContentLoaded", function () {
  const formPaciente = document.querySelector("#form-paciente");
  const tabelaPacientes = document.getElementById("tabela-pacientes");
  const tabelaSelecionados = document.getElementById("tabelaatendidos");
  const lista_completo = [];
  let valor_total = 0

  formPaciente.addEventListener("submit", function (event) {
    event.preventDefault();

    // CARREGA DADOS DO FORMULARIO
    const inputNome = document.querySelector("#nome");
    const selectPagamento = document.querySelector("#pagamento");
    const selectData = document.querySelector("#data");
    const selectProcedimento = document.querySelector("#procedimento");
    const selectvalor_pago = document.querySelector("#valor_pago");
    const selectcpf = document.querySelector("#cpf");
    const selectformas_pg = document.querySelector("#formas_pg");
    const selectrsocial = document.querySelector("#rsocial");
    const selectidade = document.querySelector("#idade");

    // DADOS DE CADA OBEJETO DA LISTA
    const registro = {
      status: false,
      nome: inputNome.value,
      data: selectData.value,
      procedimento: selectProcedimento.value,
      pagamento: selectPagamento.value,
      valor_pago: selectvalor_pago.value,
      cpf: selectcpf.value,
      formas_pg: selectformas_pg.value,
      rsocial: selectrsocial.value,
      idade: selectidade.value,
    };

    function getStatusAtendimento(atendimento) {
      var novaDiv = document.createElement("div");
      novaDiv.classList.add("status-bolinha");
    
      if (atendimento) {
        novaDiv.classList.add('status-verde');
      } else {
        novaDiv.classList.add('status-vermelho');
      }
    
      return novaDiv;
    }

    lista_completo.push(registro);
    valor_total += parseFloat(registro.valor_pago)
    console.log(valor_total)

    // CRIANDO TABELA
    const novaLinha = tabelaPacientes.insertRow();
    const colunaSelecionar = novaLinha.insertCell();
    colunaSelecionar.appendChild(getStatusAtendimento(registro.status));


    const colunaNome = novaLinha.insertCell();
    colunaNome.innerText = inputNome.value;

    const colunarsocial = novaLinha.insertCell();
    colunarsocial.innerText = selectrsocial.value;

    const colunaData = novaLinha.insertCell();
    colunaData.innerText = selectData.value;

    const colunaProcedimento = novaLinha.insertCell();
    colunaProcedimento.innerText = selectProcedimento.value;

    const colunavalor_pago = novaLinha.insertCell();
    colunavalor_pago.innerText = ` R\$ ${selectvalor_pago.value}`;

    
    

    const celulaAcoes = novaLinha.insertCell();
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
      tabelaPacientes.deleteRow(novaLinha.rowIndex);
    });
    celulaAcoes.appendChild(botaoExcluir);

    function atualizarCorStatus(atendimento, divStatus) {
      divStatus.classList.remove('status-verde', 'status-vermelho');
      
      if (atendimento) {
        divStatus.classList.add('status-verde');
      } else {
        divStatus.classList.add('status-vermelho');
      }
    }
    
    // ... (seu código anterior)
    
    
    var botao = document.createElement("button");
    botao.className = "edit-button";
    // Crie o elemento de ícone
    var icone = document.createElement("i");
    icone.className = "fas fa-pencil-alt";
    // Adicione o ícone ao botão
    botao.appendChild(icone);
    botao.addEventListener("click", function () {
      if (registro.status) {
        registro.status = false
      } else {
        registro.status = true
        
        
      }
      const divStatus = colunaSelecionar.querySelector('.status-bolinha');
      atualizarCorStatus(registro.status, divStatus);
      const atendidos = document.getElementById("coluna-atendidos");
      atendidos.innerHTML = `${contarStatusVerdadeiro()}`
    });
    celulaAcoes.appendChild(botao);
    const total_pago = document.getElementById("coluna-valor-total");
    total_pago.innerHTML = ` R\$ ${valor_total}`
    
    function contarStatusVerdadeiro() {
      let contador = 0;
      lista_completo.forEach(registro => {
        if (registro.status === true) {
          contador++;
        }
      });
      return contador;
    }
    




    localStorage.setItem("dadosPessoais", JSON.stringify(lista_completo));

  });


  

  // Resto do código ...

  const botaoSalvar = document.createElement("button");
  botaoSalvar.innerHTML = "Salvar";
  botaoSalvar.classList.add('botao-salvar');
  
  botaoSalvar.addEventListener("click", function() {
    const csvContent = "data:text/csv;charset=utf-8," 
                   + lista_completo.map(e => Object.values(e).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lista_pacientes.csv");

    document.body.appendChild(link);
    link.click();
  });

  const containerNome = document.querySelector("#nome").parentNode;
  containerNome.appendChild(botaoSalvar);

  // Recupera o objeto armazenado no localStorage
  const dadosRecuperados = JSON.parse(localStorage.getItem('dadosPessoais'));
  console.log(dadosRecuperados);
  
  
});
