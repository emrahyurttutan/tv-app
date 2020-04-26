import React, { Component } from "react";
import Button from "../../components/Button";
import TextBox from "../../components/TextBox";
import Toggle from "../../components/Toggle";
import Loading from "../../components/Loading";
import PageContent from "../../components/PageContent";
import { SelectButton } from "primereact/selectbutton";

import * as Yup from "yup";

export default class ChannelNew extends Component {
  componentWillMount() {
    this.props.getCategoriesOptions();
  }
  /**
   * Gelen key ve value'yi props'tan gelen metoda gönderir. O da değerleri action'a yollar.
   */
  onChange = (value, key) => {
    this.props.pageInputChange(key, value);
  };
  /**
   * Validation Şemasını Kontrol Ederek, Eğer Validate ise Api İsteği Yapılacak Action'a Gider, Değilse İlgili Yerlere Hata Dönecek Action'u Tetikler.
   */
  onSubmit = e => {
    const { formData } = this.props;
    const validationSchema = Yup.object({
      name: Yup.string().required("Kanal adı gerekli!"),
      icon: Yup.string()
        .url("Geçerli bir url girin")
        .required("Kanal ikonu gerekli!"),
      url: Yup.string()
        .url("Geçerli bir url girin")
        .required("Kanal url gerekli!")
    });
    let formErrors = {};
    validationSchema
      .validate(formData, {
        abortEarly: false
      })
      .then(() => {
        formErrors = {};
        this.props.pageFormErrorChange(formErrors);
        this.props.pageSaveOrUpdate(
          "channel/add",
          {
            modal: {
              title: "Başarılı"
            }
          },
          {
            modal: {
              title: "Başarısız"
            }
          }
        );
      })
      .catch(err => {
        err.inner.forEach(e => {
          const { path, message } = e;
          formErrors[path] = message;
        });
        this.props.pageFormErrorChange(formErrors);
      });
    e.preventDefault();
  };
  render() {
    const { formErrors, formLoader, formData, categoryList } = this.props;

    return (
      <PageContent
        pageTitle={"Yeni Kanal"}
        breadCrumbItems={[
          { label: "Kanallar", url: "/channels" },
          { label: "Yeni Kanal" }
        ]}
      >
        <form onSubmit={this.onSubmit}>
          <div className="col-md-12">
            <TextBox
              className={
                formErrors.name ? "errorInput form-control" : "form-control"
              }
              label="Kanal Adı"
              value={formData.name}
              errorMessage={formErrors.name}
              onChange={e => this.onChange(e.target.value, "name")}
            />
          </div>
          <div className="col-md-12">
            <TextBox
              className={
                formErrors.url ? "errorInput form-control" : "form-control"
              }
              label="Kanal Url"
              value={formData.url}
              errorMessage={formErrors.url}
              onChange={e => this.onChange(e.target.value, "url")}
            />
          </div>
          <div className="col-md-12">
            <Toggle
              className="col-md-12"
              label="M3U8 dışında bir link mi?"
              checked={formData.embed}
              onChange={e => this.onChange(e.target.value, "embed")}
            />
          </div>
          <div className="col-md-12">
            <TextBox
              className={
                formErrors.icon ? "errorInput form-control" : "form-control"
              }
              label="Kanal Ikonu"
              type="url"
              value={formData.icon}
              errorMessage={formErrors.icon}
              onChange={e => this.onChange(e.target.value, "icon")}
            />
          </div>
          <div className="col-md-12">
            <SelectButton
              value={formData.categories}
              multiple={true}
              options={categoryList}
              style={{ marginBottom: 10 }}
              onChange={e => this.onChange(e.value, "categories")}
            />
          </div>

          <Toggle
            className="col-md-12"
            label="Onaylı mı? "
            checked={formData.onay}
            onChange={e => this.onChange(e.target.value, "onay")}
          />
          <div className="row">
            <div className="col-md-6">
              <Button type="submit" title="Kaydet">
                {formLoader ? (
                  <Loading
                    show={formLoader}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                      verticalAlign: "middle"
                    }}
                  />
                ) : null}
              </Button>
            </div>
          </div>
        </form>
      </PageContent>
    );
  }
}
