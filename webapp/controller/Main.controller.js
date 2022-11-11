sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/f/library",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter"
    // "sap/ui/webc/main/Toast"
], function(Controller, JSONModel, library, FilterOperator, Filter) {
    "use strict";

	return Controller.extend("sync.c201.bookcheck.controller.Main", {

        
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();

			this.getView()
				.setModel(
					new JSONModel({
						date : null
					}),
					'view'
				),

			this._getReMakeData();
		},

		_getReMakeData: function() {
			var oComponent = this.getOwnerComponent(),
				oModel = oComponent.getModel();

			oModel.read("/BookingSet", {
				success: function(oData) {
					this.getView().getModel('view').setProperty('/plant', this._make(oData.results));
					debugger;
				}.bind(this),
				error: function() {
					debugger;
				}
			})
		},

		_make: function(aData) {
			return aData.reduce(function(acc, current) {
				if (acc.findIndex(({ Plant }) => Plant === current.Plant) === -1) {
				  acc.push(current);
				}
				return acc;
			  }, []);
		},

		/**
		 * 
		 */
		onListPress: function(oEvent) {
			var oNextUIState = this.getOwnerComponent()
									.getHelper()
									.getNextUIState(1);
			var oItem = this.getView().getModel().getProperty(oEvent.getSource().getBindingContextPath())


			this.oRouter.navTo(
				"Detail",
				{
					layout: oNextUIState.layout,
					Custid : oItem.Custid
				}
			)
		},

		onSearch : function(oEvent) {
			/*
			1. SAPGUI SEGW 에서 ABAP CDS => Filter 구현 ㅇ
			2. "GO" 버튼 클릭 시 onSearch 이벤트 함수를 탄다. ㅇ
			3. 사용자 입력값(조건)을 가져와서, Filter 모델 구성
			4. Table Binding 정보에 Filter 모델 적용 ㅇ
			*/

			// combobox


			// date
			var oCombobox = this.byId('filterCombobox');
			var oDatePicker = this.byId('filterDatePicker');

			var sComboboxKey = oCombobox.getSelectedKey(),
			    // sDateValue = oDatePicker.getValue();
			    sDateValue = this.getView().getModel("view").getProperty("/date");// oDatePicker._getSelectedDate()
				console.log(sDateValue)
			var aFilters = [];
			var oFilter1 = new Filter("Plant", FilterOperator.EQ, sComboboxKey);
			// var aFilter = [
			// 	new Filter("Plant", FilterOperator.EQ, sComboboxKey)
			// 	// new Filter("Indat", FilterOperator.EQ, sDateValue)
			// ];

			var oFilter2 = new Filter("Indat", FilterOperator.EQ, sDateValue);
			// var aFilter = [
			// 	new Filter("Indat", FilterOperator.EQ, sDateValue)
			// 	// new Filter("Indat", FilterOperator.EQ, sDateValue)
			// ];
			aFilters.push(oFilter1, oFilter2);

			debugger;

			this.byId("idProductsTable").getBinding("items").filter(aFilters);
		}

	});
});