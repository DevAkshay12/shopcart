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
                    var oProduct;
                    const item = aData[i + j];
                    const stateclass = item.state === "available" ? "Avalstate" :
                        item.state === "notavailable" ? "notavalstate" : "Defaulstate";
                    const imageUrl = item.url || "img/placeholder.jpg";

                    const oFlipContent = new sap.m.VBox({
                        alignItems: "Center",
                        justifyContent: "Center",
                        items: [
                            new sap.m.HBox({
                                width: "100%",
                                justifyContent: "SpaceBetween",
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
                                        press: async (oEvent) => {

                                            var prodname = oEvent.getSource().getParent().mAggregations.items[0].mAggregations.items[0].mProperties.title;
                                            try {
                                                const baseUrl = window.location.origin; // Use full base URL dynamically
                                                const url = `${baseUrl}/odata/v4/shop/Products?$filter=name eq '${prodname}'`;
                                                debugger
                                                const response = await fetch(url, {
                                                    credentials: 'include',
                                                    headers: { 'Accept': 'application/json' }
                                                });
                                                const data = await response.json();

                                                if (data.value && data.value.length > 0) {
                                                    oProduct = data.value[0]; // Assuming name is unique
                                                    sap.ui.getCore().byId(`desc_${i}_${j}`).setText(oProduct.description || "No description");
                                                    sap.ui.getCore().byId(`price_${i}_${j}`).setNumber(oProduct.price || 0);
                                                    sap.ui.getCore().byId(`supp_${i}_${j}`).setText(oProduct.supplier || "No Supplier");
                                                    sap.ui.getCore().byId(`dis_${i}_${j}`).setText(oProduct.discount || "No discounts Available");

                                                    console.log("Product Details:", oProduct);

                                                    // You can now update a model or flip logic with details
                                                    // e.g., set a new model for back side of the card, or update bound properties dynamically
                                                } else {
                                                    console.warn("No product found with name:", prodname);
                                                }
                                            } catch (err) {
                                                debugger
                                                console.error("Fetch error:", err);
                                            }
                                            const oIcon = oEvent.getSource();
                                            const oFlipBox = oIcon.getParent().getParent();
                                            const aItems = oFlipBox.getItems();
                                            const oHbox = aItems[0];
                                            const oText = aItems[3];

                                            const isFlipped = aItems[1].getVisible();

                                            if (isFlipped) {
                                                // Flip to show text
                                                oIcon.setIcon("sap-icon://undo");
                                                aItems[1].setVisible(false);
                                                aItems[2].setVisible(false);
                                                oText.setVisible(true);

                                                oFlipBox.removeStyleClass("unflip");
                                                oFlipBox.addStyleClass("flip");
                                                oText.addStyleClass("no-flip");
                                                oHbox.addStyleClass("no-flip");

                                            } else {
                                                // Flip back to show image
                                                oIcon.setIcon("sap-icon://hint");
                                                aItems[1].setVisible(true);
                                                aItems[2].setVisible(true);
                                                oText.setVisible(false);

                                                oFlipBox.removeStyleClass("flip");
                                                oFlipBox.addStyleClass("unflip");

                                                oText.removeStyleClass("no-flip");
                                                oHbox.removeStyleClass("no-flip");

                                                setTimeout(() => {
                                                    oFlipBox.removeStyleClass("unflip");
                                                }, 600);
                                            }
                                        }

                                    }).addStyleClass("hintBtn")
                                ]
                            }),
                            new sap.m.Image({
                                src: imageUrl,
                                width: "150px",
                                height: "150px",
                                densityAware: false,
                                decorative: false
                            }).addStyleClass("Image"),
                            new sap.m.Button({ icon: "sap-icon://cart-3",type: "Transparent" }).addStyleClass("cart"),
                            new sap.m.VBox({
                                visible: false,
                                alignItems: "Center",
                                justifyContent: "Center",
                                items: [
                                    new sap.m.Text({ id: `desc_${i}_${j}`, text: "Loading..." }).addStyleClass("cardtext"),
                                    new sap.m.Label({ text: "", width: "8px" }), // Spacer
                                    new sap.m.ObjectNumber({ id: `price_${i}_${j}`, number: "" }).addStyleClass("cardprice"),
                                    new sap.m.Text({ id: `supp_${i}_${j}`, text: "Loading..." }).addStyleClass("cardsupplier"),
                                    new sap.m.Label({ text: "", width: "8px" }).addStyleClass("spacer"),
                                    new sap.m.Text({ id: `dis_${i}_${j}`, text: "Loading..." }).addStyleClass("disc"),
                                    new sap.m.Button({ icon: "sap-icon://cart-3" }).addStyleClass("cart"),

                                ]
                            })
                        ]
                    });

                    const oCell = new sap.ui.layout.BlockLayoutCell({
                        content: [oFlipContent]
                    });


                    oRow.addContent(oCell);
                }
                oBlock.addContent(oRow);

            }
        },
    });
});