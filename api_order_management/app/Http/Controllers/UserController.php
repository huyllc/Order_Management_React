<?php

namespace App\Http\Controllers;

use App\Http\Resources\SelectSearchSale;
use App\Repositories\UsersRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $userRepo;

    public function __construct(UsersRepository $userRepo) {
        $this->userRepo = $userRepo;
    }

    /**
     * Get role sale
     */
    public function index()
    {
        DB::beginTransaction();
        try{
            return $this->userRepo->findByField('role', 'sale');
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
    * Search user role
    */
    public function searchFilter(Request $request)
    {
        DB::beginTransaction();
        try{
            $params = [
                'name' => $request->input('name', null),
            ];
            $paramsSearch = [
                'conditions' => [],
            ];
            if (!empty($params['name'])) {
                $paramsSearch['conditions'][] = ['name', 'LIKE', '%'.$params['name'].'%'];
            }
            $paramsSearch['conditions'][] = ['role', '=', 'sale'];

            $sales = $this->userRepo->searchByParams($paramsSearch);

            return SelectSearchSale::collection($sales);
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

     /**
     * Search user role
     */
    public function search(Request $request)
    {
        DB::beginTransaction();
        try{
            $params = [
                'name' => $request->input('name', null),
            ];
            $paramsSearch = [
                'conditions' => [],
            ];
            if (!empty($params['name'])) {
                $paramsSearch['conditions'][] = ['name', 'LIKE', '%'.$params['name'].'%'];
            }
            $paramsSearch['conditions'][] = ['role', '=', 'sale'];

            return $this->userRepo->searchByParams($paramsSearch);
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }
}
