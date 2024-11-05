const { Construct } = require('constructs');
const { Model, RequestValidator } = require("aws-cdk-lib/aws-apigateway");
const { jsonSchema } = require("@super-deals-copy/shared");

class DealValidations extends Construct {
  constructor(scope, id, props) {
    super(scope, id);
    console.log("(+) Inside 'DealValidations'");


    const { restApi } = props;

    this.model = new Model(this, 'DealModel', {
      restApi: restApi,
      contentType: 'application/json',
      description: 'Validation model for deals',
      schema: jsonSchema
    });

    this.requestValidator = new RequestValidator(this, 'DealRequestValidator', {
      restApi: restApi,
      validateRequestBody: true,
      validateRequestParameters: false
    });
  }
}

module.exports = { DealValidations };