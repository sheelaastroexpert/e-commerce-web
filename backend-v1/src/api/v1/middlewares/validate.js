
import Joi from 'joi';

const validate = (schema) => {
  return (req, res, next) => {
    let dataToValidate;
    
    // Determine which data to validate based on the schema name
    if (schema === 'params') {
      dataToValidate = req.params;
    } else if (schema === 'query') {
      dataToValidate = req.query;
    } else {
      dataToValidate = req.body;
    }

    try {
      const { error } = schema.validate(dataToValidate, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const errors = error.details.map(err => ({
          field: err.path[0],
          message: err.message
        }));
        
        return res.status(400).json({
          success: false,
          errors
        });
      }
      
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validate;