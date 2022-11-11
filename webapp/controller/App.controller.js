sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("sync.c201.bookcheck.controller.App", {
        onInit: function() {
          //  라우터 객체 get
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter.attachRouteMatched(this.onRouteMatched, this);
          this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
        },

        onRouteMatched: function(oEvent) {
          var sRouteName = oEvent.getParameter('name'),
              oArguments = oEvent.getParameter('arguments');

          this._updateUIElements();
        },

        onBeforeRouteMatched: function(oEvent) {
            var oModel = this.getOwnerComponent().getModel('fcl');

            var sLayout = oEvent.getParameters().arguments.layout;

            if(!sLayout){
                // component.js 에서 sap에서 flexible column layout을 지원하기위한 getHelper를 통해 UIState를 세팅한다.
                var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
                sLayout = oNextUIState.layout;
            }

            if(sLayout){
                oModel.setProperty('/layout', sLayout);
            }
        },

        onStateChanged: function() {
            this._updateUIElements();
        },

        _updateUIElements: function() {
            var oModel = this.getOwnerComponent().getModel('fcl'),
                oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();
            
            oModel.setData(oUIState);
        },

        /**
         * 프로그램 끝났을경우 이벤트 detach
         */
        onExit: function() {
            this.oRouter.detachRouteMatched(this.onRouteMatched, this);
            this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
        }
      });
    }
  );
  