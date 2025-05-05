sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("shopcart.controller.View1", {
        onInit() {
        },
        item : function(oEvent)
        {
            debugger
            const val = oEvent.mParameters.listItem.mProperties.title;
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView3",{
                categoryName: encodeURIComponent(val)
            });
            
        }
    });
});