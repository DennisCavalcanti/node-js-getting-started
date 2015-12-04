angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, uppercaseFilter, $http) {
			$scope.app="Lista Telefonica";
			$scope.contatos = [];
			$scope.operadoras = [];	
			
			var carregarContatos = function (){
			$http.get("/backend/contatos").success(function(data, status){
				$scope.contatos = data;
				}).error(function (data, status){
					$scope.message = "Aconteceu um problema: " + data;
				});
			};
			
			var carregarOperadoras = function (){
			$http.get("/backend/operadoras").success(function(data){
				$scope.operadoras = data;
				});	
			};
			
			$scope.adicionarContato = function (contato){
			//$scope.contatos.push({nome: $scope.nome, telefone: $scope.telefone});
			//$scope.contatos.push({nome: nome, telefone: telefone});
			//$scope.contatos.push(angular.copy(contato));
			contato.data = new Date();
			$http.post("/backend/contatos", contato).success(function(data){
				delete $scope.contato;
				$scope.contatoForm.$setPristine();
				carregarContatos(); //$scope.contatos.push(angular.copy(contatos));
			});
			};
			$scope.apagarContatos = function (contatos) {
			$scope.contatos = contatos.filter(function(contato){
					if(!contato.selecionado) return contato;
				});
			};
			$scope.isContatoSelecionado = function (contatos){
				return contatos.some(function(contato){
					return contato.selecionado;
				});
			};
			$scope.ordenarPor = function (campo){
				$scope.criterioDeOrdenacao = campo;
				$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
			};
			carregarContatos();
			carregarOperadoras();
		});	