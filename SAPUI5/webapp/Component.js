//@ts-nocheck
sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "logaligroup/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "logaligroup/SAPUI5/controller/HelloDialog",
  ],
  /**
   * @param (typeof sap.ui.core.UIComponent)  UIComponent
   * @param (typeof sap.ui.model.resource.ResourceModel)  ResourceModel
   */

  function (UIComponent, Models, ResourceModel, HelloDialog) {
    return UIComponent.extend("logaligroup.SAPUI5.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        // Calle the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);

        //Set data model on the view
        this.setModel(Models.createRecipient());

        //Set i18n model on the view
        //var i18nModel = new ResourceModel({
        //  bundleName: "logaligroup.SAPUI5.i18n.i18n",
        //});
        //this.setModel(i18nModel, "i18n");
        //set the device model
        this.setModel(Models.createDeviceModel(), "device");

        this._helloDialog = new HelloDialog(this.getRootControl());

        //create the views base on the url/bash
        this.getRouter().initialize();
      },
      exit: function () {
        this._helloDialog.destroy();
        delete this._helloDialog;
      },
      openHelloDialog: function () {
        this._helloDialog.open();
      },

      getContentDensityClass: function() {
        if (!Device.support.touch) {
            this._sContentDensityClass = "sapUiSizeCompact";
        } else {
            this._sContentDensityClass = "sapUiSizeCozy";
        }
        return this._sContentDensityClass;
    } 
    
    });
  }
);
