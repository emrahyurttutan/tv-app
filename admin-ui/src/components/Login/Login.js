import React, { Component } from "react";
import TextBox from "../TextBox";
import Button from "../Button";
import Loading from "../Loading";
import * as Yup from "yup";
import PropTypes from "prop-types";
import authService from "../../utils/authService";
export default class Login extends Component {
  static propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    formLoader: PropTypes.bool,
    alertMessageType: PropTypes.string
  };
  static defaultProps = {
    formData: {},
    formErrors: {},
    formLoader: false,
    alertMessageType: ""
  };

  componentWillMount = () => {
    if (authService.isExistsToken()) {
      this.props.history.push("/home");
    }
  };

  /**
   * Gelen key ve value'yi props'tan gelen metoda gönderir. O da değerleri action'a yollar.
   */
  onChange = (value, key) => {
    this.props.authInputChange(key, value);
  };
  /**
   * Validation Şemasını Kontrol Ederek, Eğer Validate ise Api İsteği Yapılacak Action'a Gider, Değilse İlgili Yerlere Hata Dönecek Action'u Tetikler.
   */
  submitLogin = e => {
    const { formData } = this.props;
    const validationSchema = Yup.object({
      email: Yup.string()
        .required("E-Posta alanı gereklidir")
        .email("Geçerli bir mail adresi giriniz."),
      password: Yup.string().required("Bu alan gereklidir")
    });
    let formErrors = {};
    validationSchema
      .validate(formData, {
        abortEarly: false
      })
      .then(() => {
        formErrors = {};
        this.props.authErrorChange(formErrors);
        this.props.authLogin();
      })
      .catch(err => {
        err.inner.forEach(e => {
          const { path, message } = e;
          formErrors[path] = message;
        });
        this.props.authErrorChange(formErrors);
      });
    e.preventDefault();
  };

  /**
   * Gelen Message Type'a Göre, İlgili String Metnini Döndürür.
   */
  renderLoginMessageType = () => {
    const { alertMessageType } = this.props;
    switch (alertMessageType) {
      case "api":
        return "Sunucularda şu anda bir sorunla karşılaşıldı. En kısa sürede bu konuyla ilgili düzenleme yapılacaktır...";
      case "form":
        return "E-Posta Adresi veya Şifre Hatalı";
      case "success":
        return "Başarıyla oturum açıldı! Yönlendiriliyorsunuz..";
      default:
        break;
    }
  };

  render() {
    const { formErrors, alertMessageType, formLoader, formData } = this.props;
    return (
      <div className="login-page">
        <div className="login-page-wrapper">
          <div
            className={
              alertMessageType
                ? alertMessageType === "success"
                  ? "success-message success active"
                  : "error-message active"
                : "info-message"
            }
          >
            {this.renderLoginMessageType()}
          </div>
          <div className="login-header">
            <div className="title">TV App Login</div>
          </div>
          <div className="login-content form">
            <form onSubmit={this.submitLogin}>
              <div className="col-md-12">
                <TextBox
                  className={formErrors.email ? "errorInput" : ""}
                  label="E-Posta Adresiniz"
                  errorMessage={formErrors.email}
                  value={formData.email}
                  onChange={e => this.onChange(e.target.value, "email")}
                />
              </div>
              <div className="col-md-12">
                <TextBox
                  className={formErrors.password ? "errorInput" : ""}
                  label="Parolanız"
                  type="password"
                  value={formData.password}
                  errorMessage={formErrors.password}
                  onChange={e => this.onChange(e.target.value, "password")}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Button type="submit" title="Giriş Yap">
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
          </div>
        </div>
      </div>
    );
  }
}
