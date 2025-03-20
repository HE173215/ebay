import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useProduct } from './ProductContext'; // Adjust import path as needed

// CategoryCard Component
export const CategoryCard = ({ category, onSelect }) => {
    const { getProductsByCategory } = useProduct();
    const productCount = getProductsByCategory(category.id).length;

    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
            </CardContent>
            <CardFooter className="justify-between">
        <span className="text-sm text-muted-foreground">
          {productCount} sản phẩm
        </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelect(category.id)}
                >
                    Xem chi tiết <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

// CategoryList Component
export const CategoryList = ({ onCategorySelect }) => {
    const { categories } = useProduct();

    return (
        <div className="space-y-4">
            {categories.map(category => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onSelect={onCategorySelect}
                />
            ))}
        </div>
    );
};

// CategoryNavigation Component
export const CategoryNavigation = ({
                                       activeCategory,
                                       onCategoryChange
                                   }) => {
    const { categories } = useProduct();

    return (
        <nav className="flex space-x-2 bg-background p-2 rounded-md overflow-x-auto">
            <Button
                variant={activeCategory === null ? 'default' : 'ghost'}
                onClick={() => onCategoryChange(null)}
                className="flex items-center"
            >
                Tất cả
            </Button>
            {categories.map(category => (
                <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'ghost'}
                    onClick={() => onCategoryChange(category.id)}
                    className="flex items-center"
                >
                    {category.name}
                    {activeCategory === category.id && (
                        <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            ))}
        </nav>
    );
};

// Example usage in a page component
export const CategoryPage = () => {
    const [activeCategory, setActiveCategory] = React.useState(null);
    const { categories, getProductsByCategory } = useProduct();

    const handleCategorySelect = (categoryId) => {
        setActiveCategory(categoryId);
        // Additional logic for category selection if needed
    };

    // Determine which products to display based on active category
    const displayProducts = activeCategory
        ? getProductsByCategory(activeCategory)
        : [];

    return (
        <div className="container mx-auto p-4">
            <CategoryNavigation
                activeCategory={activeCategory}
                onCategoryChange={handleCategorySelect}
            />
            <div className="mt-6">
                {activeCategory ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            {categories.find(c => c.id === activeCategory)?.name || 'Danh mục'}
                        </h2>
                        {/* You can add product list rendering here */}
                        <p>{displayProducts.length} sản phẩm</p>
                    </div>
                ) : (
                    <CategoryList onCategorySelect={handleCategorySelect} />
                )}
            </div>
        </div>
    );
};

export default CategoryPage;