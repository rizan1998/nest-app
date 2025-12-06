import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { randomUUID } from 'crypto';
import { updateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {

    private articles: IArticle[] = [];

    createArticle(createArticleDto: createArticleDto)  {
        const article: IArticle = {
            id: randomUUID(),
            ...createArticleDto
        };
        this.articles.push(article);
        return article;
    }
    
    findAllArticle(): IArticle[] {
        return this.articles;
    }

    findOneBydParams(id: string): IArticle | undefined { 
        return this.articles.find(item  => item.id === id);
    }

    updateArticleByParams(article: IArticle, updateArticleDto: updateArticleDto): IArticle{
        Object.assign(article, updateArticleDto);
        return article;
    }

    deleteArticleByParams(articleData: IArticle): void {
        this.articles = this.articles.filter(item => item.id !== articleData.id);

    }
}
