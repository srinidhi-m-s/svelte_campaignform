<script lang="ts">
	

    let campaignName = '';
    let email = '';
    let description = '';
    let errors = {
      campaignName: '',
      email: '',
      description: ''
    };
    let successMessage = '';
  
    function validateEmail(email:string) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    function validateForm() {
      let valid = true;
      errors = { campaignName: '', email: '', description: '' };
  
      if (!campaignName || campaignName.length > 50) {
        errors.campaignName = 'Campaign Name is required and must be under 50 characters.';
        valid = false;
      }
  
      if (!email || !validateEmail(email)) {
        errors.email = 'A valid email is required.';
        valid = false;
      }
  
      if (!description || description.length > 200) {
        errors.description = 'Description is required and must be under 200 characters.';
        valid = false;
      }
  
      return valid;
    }
  
    async function submitForm() {
      if (!validateForm()) return;
  
      
      try {
        const res = await fetch('/new-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignName, email, description })
        });
  
        if (res.ok) {
          successMessage = 'Campaign submitted successfully!';
          campaignName = '';
          email = '';
          description = '';
        }
      } catch (err) {
        console.error('Form submission error:', err);
      }
    }
  </script>
  
  <!-- Form Structure -->   
  <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">      
    <div class="hidden lg:flex lg:gap-x-12">
      <a href="/" class="text-sm font-semibold leading-6 text-gray-900">Home</a>
      <a href="/new-campaign" class="text-sm font-semibold leading-6 text-gray-900">New Campaign</a>      
    </div>  
  </nav> 
  <div class="container mx-auto py-8">
    
    <h1 class="text-3xl font-bold mb-4">Create & Send New Campaign</h1>
  
    <div class="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="campaignName">
          Campaign Name
        </label>
        <input 
          id="campaignName"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={campaignName}
          maxlength="50"
        />
        {#if errors.campaignName}
          <p class="text-red-500 text-xs italic">{errors.campaignName}</p>
        {/if}
      </div>
  
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input 
          id="email"
          type="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={email}
        />
        {#if errors.email}
          <p class="text-red-500 text-xs italic">{errors.email}</p>
        {/if}
      </div>
  
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          Campaign Description
        </label>
        <textarea
          id="description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={description}
          maxlength="200"
        ></textarea>
        {#if errors.description}
          <p class="text-red-500 text-xs italic">{errors.description}</p>
        {/if}
      </div>
  
      <div class="flex items-center justify-between">
        <!--<button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          on:click|preventDefault={submitForm}
        >
          Submit Campaign
        </button>-->
        <button
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600 "
          on:click|preventDefault={submitForm}
        >
          Submit Campaign
        </button>
      </div>
  
      {#if successMessage}
        <p class="text-green-500 text-sm italic mt-4">{successMessage}</p>
      {/if}
    </div>
  </div>
  
  
  <style>
    .container {
      max-width: 600px;
    }
  </style>
