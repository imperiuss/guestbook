package com.imp.guestbook.service.impl;

import com.imp.guestbook.dao.RecordDao;
import com.imp.guestbook.entity.Record;
import com.imp.guestbook.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 *
 *  Implementation of {@link RecordService}
 *
 */
@Service
@Transactional
public class RecordServiceImpl implements RecordService {

    private RecordDao recordDao;

    @Autowired
    public RecordServiceImpl(RecordDao recordDao) {
        this.recordDao = recordDao;
    }

    @Override
    public Page<Record> getOrderedRecords(Pageable pageable) {
        return recordDao.findAllByOrderByDateDesc(pageable);
    }

    @Override
    public void saveRecord(Record record) {
        recordDao.save(record);
    }
}
