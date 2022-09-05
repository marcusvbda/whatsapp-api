import {Controller, Get } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";


@Controller('api/tests')
@ApiTags('tests')
export class TestsController {
    @Get('/')
    async index() {
        return "tests controller bla bla bla"
    }
}

