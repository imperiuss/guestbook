package com.imp.guestbook.controller;

import com.imp.guestbook.entity.Record;
import com.imp.guestbook.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */

@RestController
public class RecordController {

    private RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping(value = "/records")
    Page<Record> list (Pageable pageable){
        Page<Record> records = recordService.getOrderedRecords(pageable);
        return records;
    }

    @PostMapping(value = "/saverecord")
    public void saveRecord (@RequestBody Record record){
        System.out.println(record);
    }

}
