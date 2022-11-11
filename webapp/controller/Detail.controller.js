sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/f/library"
    // "sap/ui/webc/main/Toast"
],
    // /**
    //  * @param {typeof sap.ui.core.mvc.Controller} Controller
    //  */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.c201.bookcheck.controller.booking", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

            this.getView()
                .setModel(
                    new JSONModel([{
                        a: "일일일ㅇ릴",
                    
                    }]),
                    "detail"
                ) 
               
			this.oRouter.getRoute("Detail").attachPatternMatched(this._onAttachPatternMatched, this);
		},

		_onAttachPatternMatched: function (oEvent) {
            var oArg = oEvent.getParameter("arguments");
            
            // this.byId('suppliersTable')
            //     .getBinding('items')
            //     .filter(
            //         [ new sap.ui.model.Filter('Custid', 'EQ', oArg.Custid) ]
            //     );

            // odata read
            // "/entitySet(oArg)"

            var oModel = this.getView().getModel() // odata model 불러옴 

            oModel.read("/BookingSet", {
                success: function(oReturn) {
                    
                    // filters: [ new Filter('Custid', 'EQ', oArg.Custid) ]
                    var aFilterData = oReturn.results.filter(function(list) {
                        return list.Custid === oArg.Custid;
                    });

                    debugger;
                    this.getView().setModel(
                        new JSONModel(aFilterData),
                        'detail'
                    )
                }.bind(this),
                error: function(oError){}
            })

            debugger;
		},

        onDetailListItemPress: function() {
            var oNextUIState = this.getOwnerComponent()
                                   .getHelper()
                                   .getNextUIState(2);
            
            this.oRouter.navTo(
                "End",
                {
                    layout: oNextUIState.layout
                }
            )
        }

	});
});