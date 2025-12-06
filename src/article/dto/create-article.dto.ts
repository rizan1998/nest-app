import { ArticleStatus } from "../interface/article.interface";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class createArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsEnum(ArticleStatus)
    status: ArticleStatus;
}