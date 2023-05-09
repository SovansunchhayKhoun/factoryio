<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
          'name' => ['required', Rule::unique('products')->ignore($this->product)],
            'price'=> ['required'],
            'qty' => ['required'],
            'status' => 'In Stock',
            'type' => ['required'],
            'description' => ['required']
        ];
    }
}
