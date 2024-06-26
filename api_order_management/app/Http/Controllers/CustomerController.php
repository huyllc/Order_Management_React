<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\SelectSearchCustomerPhone;
use App\Http\Services\CustomerService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    /**
     * Show Customer List
     */
    public function index(Request $request)
    {
        try {
            $limit = $request->limit;
            $customers = $this->customerService->getListPaginate($limit);
            return CustomerResource::collection($customers);

        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * Show Customer Detail
     */
    public function show($id)
    {
        try {
            return $this->customerService->show($id);
        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * Create Customer
     */
    public function store(CustomerRequest $request)
    {
        try {
            $request->validated();
            $params = $request->only(['customer_code','name', 'type', 'email', 'address', 'tax_code', 'phone']);
            $newCustomer = $this->customerService->store($params);
            $id = $newCustomer->id;
            if(!$newCustomer->customer_code){
                $customerCode = 'KH_' . $id;
                $params['customer_code'] = $customerCode;
                $newCustomer->update(['customer_code' => $customerCode]);
            }
            return $newCustomer;
        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * Edit Customer
     */
    public function update(UpdateCustomerRequest $request, string $id)
    {
        try {
            $params = $request->only(['customer_code', 'name', 'type', 'email', 'address', 'tax_code', 'phone']);
            return $this->customerService->update($params, $id);
        } catch (Exception $exception) {
            return response()->json([
                'error' => true,
                'message' => $exception->getMessage()
            ]);
        }
    }

    public function search(Request $request) {
        DB::beginTransaction();
        try{
            $params = [
                'customer_code' => $request->input('customer_code', null),
                'name' => $request->input('name', null),
                'phone' => $request->input('phone', null),
            ];
            return CustomerResource::collection($this->customerService->search($params));
            DB::commit();
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function searchByPhone(Request $request) {
        try{
            $params = [
                'phone' => $request->input('phone') ?? "",
            ];
            return SelectSearchCustomerPhone::collection($this->customerService->search($params));
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

