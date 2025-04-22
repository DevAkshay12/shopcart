sap.ui.define([
    "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("shopcart.controller.View3", {
        onInit() {
            debugger
            this.getOwnerComponent().getRouter().getRoute("RouteView3").attachPatternMatched(this._onRouteMatched, this);
        },


        _onRouteMatched: function (oEvent) {
            const categoryName = oEvent.getParameter("arguments").categoryName;

            const oList = this.byId("productList");
            const oBinding = oList.getBinding("items");

            // Filter for category name (expand category first if needed)
            const oFilter = new Filter("category/name", FilterOperator.EQ, categoryName);
            oBinding.filter([oFilter]);
        },
        _onRouteMatched: function (oEvent) {
            const categoryName = oEvent.getParameter("arguments").categoryName;
            fetch(`/odata/v4/shop/Products?$filter=category/name eq '${categoryName}'`)
        .then(res => res.json())
        .then(data => {
          const oModel = new JSONModel();
          oModel.setData({ product: data.value });
          this.getView().setModel(oModel, "dataModel");
        })
        .catch(err => console.error("Error fetching products:", err));       
        }

    });

    
});