sap.ui.define([
  "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], (BaseController,JSONModel) => {
  "use strict";

  return BaseController.extend("shopcart.controller.App", {
      onInit() {
        var oViewModel;

        oViewModel = new JSONModel({
          busy: false,
          delay: 0,
          layout: "TwoColumnsMidExpanded",
          smallScreenMode: true
        });
        this.getView().setModel(oViewModel, "appView");
      }
  });
});