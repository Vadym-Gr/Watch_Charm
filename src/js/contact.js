export function initContact() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const fields = [...form.querySelectorAll('input')];
  const status = form.querySelector('.contact-status');
  const touched = new Set();
  form.noValidate = true;

  function validate(field) {
    let valid = field.validity.valid;
    if (field.name === 'name') valid = valid && Boolean(field.value.trim());
    if (field.name === 'phone') {
      const value = field.value.trim();
      const digits = value.replace(/\D/g, '');
      valid =
        valid &&
        /^\+?[0-9\s()-]+$/.test(value) &&
        digits.length >= 7 &&
        digits.length <= 15;
    }
    field.setAttribute('aria-invalid', String(!valid));
    form.querySelector(`#${field.id}-error`).hidden = valid;
    return valid;
  }

  fields.forEach(field => {
    field.addEventListener('blur', () => {
      touched.add(field);
      validate(field);
    });
    field.addEventListener('input', () => {
      status.hidden = true;
      if (touched.has(field)) validate(field);
    });
  });
  form.querySelector('textarea').addEventListener('input', () => {
    status.hidden = true;
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.hidden = true;
    fields.forEach(field => touched.add(field));
    const invalidFields = fields.filter(field => !validate(field));
    if (invalidFields.length) {
      invalidFields[0].focus();
      return;
    }
    form.reset();
    touched.clear();
    fields.forEach(field => {
      field.removeAttribute('aria-invalid');
      form.querySelector(`#${field.id}-error`).hidden = true;
    });
    status.hidden = false;
  });
  form.querySelector('.contact-send').disabled = false;
}
