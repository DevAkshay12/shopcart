sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/layout/BlockLayoutRow",
    "sap/ui/layout/BlockLayoutCell",
    "sap/ui/layout/VerticalLayout",
    "sap/m/ObjectIdentifier",
    "sap/m/ObjectStatus",
    "sap/m/Image",
    "sap/m/Button",
    "sap/ui/core/mvc/Controller"
], (Controller,
    BlockLayoutRow,
    BlockLayoutCell,
    VerticalLayout,
    ObjectIdentifier,
    ObjectStatus,
    Image,
    Button) => {
    "use strict";

    return Controller.extend("shopcart.controller.View2", {
        onInit: function () {
            debugger
            //     var data = this.byId("block").mBindingInfos.content.binding.oCache.getValue();
            //     var data = this.byId("block").mBindingInfos.content.binding.oCache.getValue();
            //     var groupeddata = [];
            //     var data = this.byId("block").mBindingInfos.content.binding.oCache.getValue();
            //     var groupeddata = [];

            //    for(var i=0;i<data.length;i += 2)
            //    {
            //     var oGroup = {
            //         cell1: aProductImg[i],
            //         cell2: aProductImg[i + 1] || {} // Fallback if odd number of items
            //       };
            //       groupeddata.push(oGroup)
            //    }
            //    var oGroupedModel = new sap.ui.model.json.JSONModel({
            //     productimgGrouped: groupeddata
            //   });

            //   this.getView().setModel(oGroupedModel, "groupedModel");

                var oCarousel = this.byId("_IDGenCarousel");

                // Set interval to change the image every 2 seconds (2000 milliseconds)
                setInterval(function () {
                    oCarousel.next(); // Change to the next page
                }, 2000);

            //     // const oBinding = oModel.bindList("/productimg");
            //     // oBinding.attachDataReceived((oEvent) => {
            //     //     const aContexts = oEvent.getSource().getContexts();
            //     //     const aData = aContexts.map(ctx => ctx.getObject());

            //     //     this._populateBlockLayout(aData);
            //     // });

            //     // oBinding.getContexts(0, 10);
        },
        onAfterRendering: function (oEvent) {
            debugger
            var groupeddata = [];
            let oBlock = this.byId("block");
            let oData = oBlock.mBindingInfos.content?.binding?.oCache?.getValue() ?? '';
            let oModel = this.getView();
            if (!oData) {
                setTimeout(() => {
                    oData = oBlock.mBindingInfos.content?.binding?.oCache?.getValue() ?? '';
                    console.log(oData);
                    for (var i = 0; i < oData.length; i += 2) {

                        groupeddata.push({
                            first: oData[i],
                            second: oData[i + 1] || {} // fallback for odd number
                        });
                    }
                    var oGroupedModel = new sap.ui.model.json.JSONModel({
                        grouped: groupeddata
                    });

                    oModel.setModel(oGroupedModel, "grouped");
                }, 1500);
            }

        },
        press: function (oEvent) {
            debugger;
            var content = oEvent.getSource().getParent().getContent();
            var image = content[0];  // Image
            var textBlock = content[3]; // VBox (Text content)
            textBlock.addStyleClass("cardTextBox");
            textBlock.getItems()[0].addStyleClass("text")
            textBlock.getItems()[1].addStyleClass("text")
            textBlock.getItems()[2].addStyleClass("text")
            var isTextVisible = textBlock.getVisible();
        
            if (!isTextVisible) {
                // First Click: Show text (VBox), hide image
                image.setVisible(false);
               
        
                // Add flip class to text (simulate card flip)
                textBlock.addStyleClass("flip");

        
                // Slide out image
                setTimeout(() => {
                    image.addStyleClass("slide-text-out");
                   
                }, 300);
              
        
                // Remove animation class
                setTimeout(() => {
                    textBlock.removeStyleClass("flip");
                    textBlock.setVisible(true);
                }, 300);
                
            } else {
                // Second Click: Show image, hide text (VBox)
                image.setVisible(true);
                textBlock.setVisible(false);
        
                // Add reverse flip to image
                image.addStyleClass("flip-reverse");
        
                // Slide image in
                setTimeout(() => {
                    textBlock.addStyleClass("slide-image-in");
                }, 300);
        
                setTimeout(() => {
                    image.removeStyleClass("flip-reverse");
                }, 600);
            }
        }
        
        
        
    })        
});