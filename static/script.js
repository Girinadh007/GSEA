document.addEventListener('DOMContentLoaded', () => {
  const student = document.getElementById('student');
  const employmentBlock = document.getElementById('employment_block');
  const incomeBlock = document.getElementById('income_block');
  const employmentSelect = document.getElementById('employment');
  const diffSelect = document.getElementById('differently_abled');
  const diffField = document.getElementById('diff_percentage_field');
  const bpl = document.getElementById('bpl');
  const bplSub = document.getElementById('bpl_sub_field');
  const incomeInput = document.getElementById('annual_income');

  function updateVisibility() {
    if (student && student.value === 'no') {
      employmentBlock.classList.remove('hidden');
      incomeBlock.classList.remove('hidden');
      employmentSelect.setAttribute('required','required');
      incomeInput.setAttribute('required','required');
    } else if (student && student.value === 'yes') {
      employmentBlock.classList.add('hidden');
      incomeBlock.classList.add('hidden');
      employmentSelect.removeAttribute('required');
      incomeInput.removeAttribute('required');
    } else {
      employmentBlock.classList.add('hidden');
      incomeBlock.classList.add('hidden');
      employmentSelect.removeAttribute('required');
      incomeInput.removeAttribute('required');
    }
  }

  student && student.addEventListener('change', updateVisibility);

  diffSelect && diffSelect.addEventListener('change', () => {
    if (diffSelect.value === 'yes') {
      diffField.classList.remove('hidden');
    } else {
      diffField.classList.add('hidden');
    }
  });

  bpl && bpl.addEventListener('change', () => {
    if (bpl.value === 'yes') bplSub.classList.remove('hidden'); else bplSub.classList.add('hidden');
  });

  updateVisibility();
});