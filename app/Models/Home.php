<?php

namespace App\Models;

use Illuminate\Support\Facades\Cache;

class Home
{
    private const CACHE_KEY = 'home_messages';

    public static function metrics(): array
    {
        return [
            'orders_count' => Order::count(),
            'clients_count' => Client::count(),
            'analysts_count' => Analyst::count(),
            'samples_count' => Sample::count(),
        ];
    }

    public static function latestOrders(int $limit = 5)
    {
        return Order::latest()->take($limit)->get();
    }

    public static function allMessages(): array
    {
        return Cache::get(self::CACHE_KEY, []);
    }

    public static function findMessage(int $id): ?array
    {
        return collect(self::allMessages())->firstWhere('id', $id);
    }

    public static function createMessage(array $data): array
    {
        $messages = self::allMessages();
        $nextId = empty($messages) ? 1 : (collect($messages)->max('id') + 1);
        $message = array_merge([
            'title' => $data['title'],
            'content' => $data['content'],
            'highlight' => (bool)($data['highlight'] ?? false),
        ], ['id' => $nextId]);
        $messages[] = $message;
        Cache::forever(self::CACHE_KEY, $messages);

        return $message;
    }

    public static function updateMessage(int $id, array $data): ?array
    {
        $messages = collect(self::allMessages());
        $index = $messages->search(fn ($item) => $item['id'] === $id);

        if ($index === false) {
            return null;
        }

        $current = $messages[$index];
        $updated = array_merge($current, $data);
        if (array_key_exists('highlight', $updated)) {
            $updated['highlight'] = (bool)$updated['highlight'];
        }
        $messages[$index] = $updated;
        Cache::forever(self::CACHE_KEY, $messages->values()->all());

        return $updated;
    }

    public static function deleteMessage(int $id): bool
    {
        $messages = collect(self::allMessages());
        $filtered = $messages->reject(fn ($item) => $item['id'] === $id)->values();

        if ($filtered->count() === $messages->count()) {
            return false;
        }

        Cache::forever(self::CACHE_KEY, $filtered->all());

        return true;
    }
}
