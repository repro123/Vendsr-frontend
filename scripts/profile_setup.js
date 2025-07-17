document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('store-form');
  
    const fields = [
      { id: 'store_name', name: 'Store Name' },
      { id: 'username', name: 'Username' },
      { id: 'category-value', name: 'Category' },
      { id: 'description', name: 'Description' },
      { id: 'store_color', name: 'Store Color' },
      { id: 'store_url', name: 'Store URL' },
      { id: 'profile-image', name: 'Profile Image', isFile: true }
    ];
  
    // Show error below input
    function showError(id, message) {
      removeError(id);
      const el = document.getElementById(id);
      const error = document.createElement('p');
      error.className = 'text-sm text-red-600 mt-2';
      error.innerText = message;
      el.insertAdjacentElement('afterend', error);
    }
  
    // Remove any existing error
    function removeError(id) {
      const el = document.getElementById(id);
      const next = el.nextElementSibling;
      if (next && next.classList.contains('text-red-600')) {
        next.remove();
      }
    }
  
    // Real-time validation when field is blurred or changed
    fields.forEach(({ id, name, isFile }) => {
      const el = document.getElementById(id);
      if (!el) return;
  
      const validate = () => {
        const value = isFile ? el.files[0] : el.value.trim();
        if (!value) {
          showError(id, `${name} can’t be left empty`);
        } else {
          removeError(id);
        }
      };
  
      el.addEventListener('blur', validate);
      el.addEventListener('change', validate);
    });
  
    // Custom Category Dropdown
    const trigger = document.getElementById('custom-category');
    const menu = document.getElementById('category-options');
    const selectedText = document.getElementById('selected-category');
    const hiddenInput = document.getElementById('category-value');
  
    trigger.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  
    menu.querySelectorAll('li').forEach(option => {
      option.addEventListener('click', () => {
        const value = option.textContent;
        selectedText.textContent = value;
        hiddenInput.value = value;
        menu.classList.add('hidden');
  
        if (value.trim()) {
          removeError('category-value');
        } else {
          showError('category-value', 'Category can’t be left empty');
        }
      });
    });
  
    // Custom Color Picker
    const colorTrigger = document.getElementById('color-trigger');
    const colorOptions = document.getElementById('color-options');
    const colorInput = document.getElementById('store_color');
    const selectedLabel = document.getElementById('selected-color-label');
  
    colorTrigger.addEventListener('click', () => {
      colorOptions.classList.toggle('hidden');
    });
  
    colorOptions.querySelectorAll('[data-color]').forEach(block => {
      block.addEventListener('click', () => {
        const color = block.getAttribute('data-color');
        colorInput.value = color;
        colorTrigger.style.backgroundColor = color;
        selectedLabel.textContent = "";
        selectedLabel.style.color = ["#FFFFFF", "#FFFC9E"].includes(color) ? "#1F1F1F" : "#FFFFFF";
        colorOptions.classList.add('hidden');
  
        if (color.trim()) {
          removeError('store_color');
        } else {
          showError('store_color', 'Store Color can’t be left empty');
        }
      });
    });
  
    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      let valid = true;
      const formData = new FormData();
  
      fields.forEach(({ id, name, isFile }) => {
        const el = document.getElementById(id);
        const value = isFile ? el.files[0] : el.value.trim();
  
        if (!value) {
          showError(id, `${name} can’t be left empty`);
          valid = false;
        } else {
          removeError(id);
          formData.append(el.name || id, value);
        }
      });
  
      if (!valid) return;
  
      try {
        const response = await fetch('/your-endpoint-url', {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) throw new Error('Server responded with an error');
        console.log('Form submitted successfully!');
      } catch (err) {
        console.error('Submission failed:', err);
      }
    });
  });
  