const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#recipe').value.trim();
  const description = document.querySelector('#description').value.trim();
  const prepTime = document.querySelector('#prep-time').value.trim();
  const cookTime = document.querySelector('#cook-time').value.trim();
  const ingredients = document.querySelector('#ingredients').value.trim();
  const instructions = document.querySelector('#instructions').value.trim();
  const protein = document.querySelector('#protein').value.trim();
  const fat = document.querySelector('#fat').value.trim();
  const carbs = document.querySelector('#carbs').value.trim();
  const calories = document.querySelector('#calories').value.trim();
  const category = document.querySelector('#category').value.trim();

  if (name && description && prepTime && cookTime && ingredients && instructions && protein && fat && carbs && calories) {
    const response = await fetch(`/profile`, {
      method: 'POST',
      body: JSON.stringify({
        recipe: name,
        description,
        prep_time: prepTime,
        cook_time: cookTime,
        ingredients,
        instructions,
        protein,
        fat,
        carbs,
        calories,
        category
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create recipe');
    }
  }
};

document
  .querySelector('.new-meal-form')
  .addEventListener('submit', newFormHandler);
  

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete meal');
      }
    }
  };
  
  document
    .querySelector('.new-meal-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.meals-list')
    .addEventListener('click', delButtonHandler);
  