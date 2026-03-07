const requiredFields = [
  'companyName',
  'contactPerson',
  'phoneNumber',
  'emailAddress',
  'city',
  'state',
  'pinCode',
  'message',
];

export const validateContactPayload = (payload) => {
  const data = payload || {};
  const missingFields = requiredFields.filter((field) => !data[field]);

  return {
    isValid: missingFields.length === 0,
    missingFields,
    data,
  };
};
