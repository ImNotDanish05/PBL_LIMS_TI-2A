<p align="center"><a href="https://www.youtube.com/@ImNotDanish05"><img src="danish05.png" width="400" alt="Created by ImNotDanish05"></a></p>

<p align="center">
<a href="https://github.com/ImNotDanish05"><img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github" alt="GitHub"></a>
<a href="https://www.youtube.com/@ImNotDanish05"><img src="https://img.shields.io/badge/YouTube-Channel-FF0000?style=for-the-badge&logo=youtube" alt="YouTube"></a>
</p>

# PBL LIMS CRUD Sandbox

This repo is a minimal Laravel 11 + React/Inertia playground used to prototype and test LIMS data models & CRUD flows. **The real production project lives here:** https://github.com/tiatiwaw/PBL_LIMS_TI-2A. Use this repo for quick model validation and UI experiments only.

## What’s inside
- Laravel 11 backend with Eloquent models, validations, and RESTful resource controllers for every LIMS entity.
- Inertia + React + Tailwind frontend (see `resources/js/pages`) that auto-builds basic tables/forms from the model `fillable` fields.
- Vite dev server for the React UI, Laravel Breeze/Ziggy for auth scaffolding and route helpers.

## Data model tour (migrations & models)
- **Samples & testing:** `samples` (with categories, form, status), `test_parameters`, `test_methods`, `analyses_methods`, and pivots like `n_parameter_methods` to connect samples, parameters, and methods with results/status.
- **Orders & clients:** `clients`, `orders` with status tracking, plus `n_order_samples` to attach multiple samples to an order and `n_analyses_methods_orders` for method coverage per order.
- **People & competency:** `analysts`, `trainings`, `certificates`, and pivots `n_training_analysts` + `n_analysts` to map who is assigned or trained for an order.
- **Resources & inventory:** `suppliers` → `reagents`, `equipments` with `brand_types`, `reference_standards`, `grades`, and `unit_values`.
- Each migration defines foreign keys with cascade deletes; controllers mirror those rules with validation (e.g., `exists` checks and enum validation for statuses/states).

## Controller flow (Laravel)
- Routes (`routes/web.php`) register a `Route::resource` for every model plus a simple `/` home page.
- Controllers fetch data with Eloquent, pass `fillable` fields to the UI for dynamic form building, and return Inertia responses.
- Standard CRUD validation is applied before create/update (strings, enums, foreign IDs). Success/error flashes surface in the React pages.

## Frontend flow (React/Inertia)
- Pages live under `resources/js/pages/{Resource}` with `Index`, `Create`, `Edit`, and `Show` screens that read props from Inertia.
- Index pages build columns from the dataset keys and use Ziggy’s `route()` helper for navigation/actions.
- Create/Edit forms iterate over `fields` (the model `fillable` array) to render inputs, submit via Inertia (`useForm`), and show validation errors inline.
- Simple Tailwind styling keeps the UI lightweight while staying consistent across resources.

## Running it locally
1) Install dependencies: `composer install` and `npm install`.  
2) Copy env & set DB: `cp .env.example .env`, adjust DB credentials.  
3) Generate app key: `php artisan key:generate`.  
4) Run migrations: `php artisan migrate`.  
5) Start servers: `php artisan serve` (API) and `npm run dev` (Vite).  
6) Open the app at the host/port Vite prints (defaults to `http://localhost:5173`) while Laravel serves API routes on `http://127.0.0.1:8000`.

## How to use the CRUD playground
- Visit the home page (`/`) then jump to any resource route (e.g., `/supplier`, `/sample`, `/order`, `/test_parameter`, etc.).
- Use **+ Add** to create records; the form fields are generated from each model’s `fillable` properties.
- Click **Show/Edit/Delete** in the tables to inspect or modify data; flash messages confirm success or errors.
- Because this is a sandbox, data is disposable—reset by dropping tables or rerunning migrations as needed.

## Notes
- Repository intent: model and UI testing only; production-ready code and business logic live in the main project at https://github.com/tiatiwaw/PBL_LIMS_TI-2A.
- Feel free to extend migrations/models/controllers here to prototype new relationships before porting them to the primary codebase.
