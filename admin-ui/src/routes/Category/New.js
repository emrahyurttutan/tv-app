import React, { Component } from "react";
import Button from "../../components/Button";
import TextBox from "../../components/TextBox";
import Toggle from "../../components/Toggle";
import Loading from "../../components/Loading";
import PageContent from "../../components/PageContent";
import * as Yup from "yup";

export default class New extends Component {
  /**
   * Gelen key ve value'yi props'tan gelen metoda gönderir. O da değerleri action'a yollar.
   */
  onChange = (value, key) => {
    this.props.pageInputChange(key, value);
  };
  /**
   * Validation Şemasını Kontrol Ederek, Eğer Validate ise Api İsteği Yapılacak Action'a Gider, Değilse İlgili Yerlere Hata Dönecek Action'u Tetikler.
   */
  submitLogin = e => {
    const { formData } = this.props;
    const validationSchema = Yup.object({
      name: Yup.string().required("Kategori adı gerekli!")
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
          "category/add",
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
    const { formErrors, formLoader, formData } = this.props;

    return (
      <PageContent
        pageTitle={"Yeni Kategori"}
        breadCrumbItems={[
          { label: "Kategoriler", url: "/category" },
          { label: "Yeni Kategori" }
        ]}
      >
        <form onSubmit={this.submitLogin}>
          <div className="col-md-12">
            <TextBox
              className={
                formErrors.name ? "errorInput form-control" : "form-control"
              }
              label="Kategori Adı"
              value={formData.name}
              errorMessage={formErrors.name}
              onChange={e => this.onChange(e.target.value, "name")}
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
