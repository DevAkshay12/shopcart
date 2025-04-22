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
], ( Controller,
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
            const oModel = this.getOwnerComponent().getModel();
            
            if (!oModel) {
                console.error("Model not found");
                return;
            }
            var oCarousel = this.byId("_IDGenCarousel");

            // Set interval to change the image every 2 seconds (2000 milliseconds)
            setInterval(function () {
              oCarousel.next(); // Change to the next page
            }, 2000);

            const oBinding = oModel.bindList("/productimg");
            oBinding.attachDataReceived((oEvent) => {
                const aContexts = oEvent.getSource().getContexts();
                const aData = aContexts.map(ctx => ctx.getObject());

                this._populateBlockLayout(aData);
            });

            oBinding.getContexts(0, 10);
        },

      

        _populateBlockLayout: function (aData) {
            debugger
            const oBlock = this.byId("block");
            const cellsPerRow = 2;
            

            for (let i = 0; i < aData.length; i += cellsPerRow) {
                const oRow = new BlockLayoutRow();

                for (let j = 0; j < cellsPerRow && (i + j) < aData.length; j++) {
                    const item = aData[i + j];
                    const stateclass = item.state === "available" ? "Avalstate" :
                                       item.state === "notavailable" ? "notavalstate" : "Defaulstate";
                    const imageUrl = item.url || "img/placeholder.jpg";
                
                    const oCell = new sap.ui.layout.BlockLayoutCell({
                        content: [
                            new sap.m.VBox({
                                alignItems: "Center",
                                justifyContent: "Center",
                                items: [
                                    new sap.m.HBox({
                                        width: "100%",
                                        justifyContent: "SpaceBetween", // Pushes items to opposite ends
                                        alignItems: "Center",
                                        items: [
                                            new sap.m.VBox({
                                                items: [
                                                    new sap.m.ObjectIdentifier({ title: item.name }),
                                                    new sap.m.ObjectStatus({ text: item.state }).addStyleClass(stateclass)
                                                ]
                                            }),
                                            new sap.m.Button({
                                                icon: "sap-icon://hint",
                                                type: "Transparent",
                                                press: (oEvent) => {
                                                    debugger
                                                    sap.m.MessageToast.show(`More info about ${item.name}`);
                                                }
                                            })
                                        ]
                                    }),
                                    new sap.m.Image({
                                        src: imageUrl,
                                        width: "150px",
                                        height: "150px",
                                        densityAware: false,
                                        decorative: false
                                    }).addStyleClass("Image"),
                                    new sap.m.Button({ icon: "sap-icon://cart-3" })
                                ]
                                
                                
                                
                            })
                        ]
                    });
                
                    oRow.addContent(oCell);
                }
                oBlock.addContent(oRow);
                
            }
        },
    });
});